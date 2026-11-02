import blogsJson from "./blogs.json";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Loans" | "Investments" | "NRI Advisory" | "Business Loans" | "Insurance" | "Taxation" | string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedDate: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  featured?: boolean;
  takeaways: string[];
  content: string; // Rich HTML/Markdown-style formatted content
}

export const BLOGS_DATA: BlogPost[] = blogsJson as BlogPost[];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const clean = slug.replace(/\.php$/, "").toLowerCase();
  return BLOGS_DATA.find((b) => b.slug.toLowerCase() === clean);
}

export function getAllCategories(): string[] {
  return ["All", "Loans", "Investments", "NRI Advisory", "Business Loans", "Insurance", "Taxation"];
}
