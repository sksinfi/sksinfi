import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { BlogPost } from "@/data/blogsData";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const BLOGS_FILE_PATH = path.join(process.cwd(), "src", "data", "blogs.json");

// Helper to read blogs from disk
async function readBlogs(): Promise<BlogPost[]> {
  try {
    const raw = await fs.readFile(BLOGS_FILE_PATH, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading blogs.json:", error);
    return [];
  }
}

// Helper to write blogs to disk
async function writeBlogs(blogs: BlogPost[]): Promise<void> {
  await fs.writeFile(BLOGS_FILE_PATH, JSON.stringify(blogs, null, 2), "utf8");
}

// GET: Return all blogs
export async function GET() {
  try {
    const blogs = await readBlogs();
    return NextResponse.json(blogs, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0"
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to read blogs", details: error?.message },
      { status: 500 }
    );
  }
}

// POST: Create or Update a blog post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      slug,
      title,
      excerpt,
      category,
      author,
      publishedDate,
      readTime,
      coverImage,
      tags,
      featured,
      takeaways,
      content,
      originalSlug
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required fields." },
        { status: 400 }
      );
    }

    // Generate or clean slug
    const cleanSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newBlog: BlogPost = {
      slug: cleanSlug,
      title: title.trim(),
      excerpt: excerpt?.trim() || title.trim(),
      category: category || "Loans",
      author: {
        name: author?.name?.trim() || "Arun Mehta",
        role: author?.role?.trim() || "Senior Financial Consultant, SKS INFI",
        avatar: author?.avatar || "/images/user (1).png"
      },
      publishedDate:
        publishedDate ||
        new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        }),
      readTime: readTime?.trim() || "5 min read",
      coverImage: coverImage?.trim() || "/images/homeloan.avif",
      tags: Array.isArray(tags)
        ? tags
        : typeof tags === "string"
        ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : ["Financial Advisory"],
      featured: Boolean(featured),
      takeaways: Array.isArray(takeaways)
        ? takeaways.filter(Boolean)
        : typeof takeaways === "string"
        ? takeaways.split("\n").map((t: string) => t.trim()).filter(Boolean)
        : [],
      content: content.trim()
    };

    const currentBlogs = await readBlogs();

    // Check if updating an existing blog (via originalSlug or matching slug)
    const targetSlug = originalSlug || cleanSlug;
    const existingIndex = currentBlogs.findIndex(
      (b) => b.slug.toLowerCase() === targetSlug.toLowerCase()
    );

    if (existingIndex >= 0) {
      // Update in place
      currentBlogs[existingIndex] = newBlog;
    } else {
      // Insert new post at the top
      currentBlogs.unshift(newBlog);
    }

    await writeBlogs(currentBlogs);

    // Optional Supabase synchronization if configured
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from("blogs").upsert([newBlog]);
      } catch (sbErr) {
        console.warn("Supabase blog sync notice:", sbErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: existingIndex >= 0 ? "Blog post updated successfully." : "Blog post published successfully.",
        blog: newBlog
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error saving blog:", error);
    return NextResponse.json(
      { error: "Failed to save blog post", details: error?.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a blog post by slug
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug parameter is required." }, { status: 400 });
    }

    const currentBlogs = await readBlogs();
    const filteredBlogs = currentBlogs.filter(
      (b) => b.slug.toLowerCase() !== slug.toLowerCase()
    );

    if (filteredBlogs.length === currentBlogs.length) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    await writeBlogs(filteredBlogs);

    // Optional Supabase sync
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from("blogs").delete().eq("slug", slug);
      } catch (sbErr) {
        console.warn("Supabase blog delete notice:", sbErr);
      }
    }

    return NextResponse.json(
      { success: true, message: `Blog '${slug}' deleted successfully.` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog", details: error?.message },
      { status: 500 }
    );
  }
}
