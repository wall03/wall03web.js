import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: Request) {
  try {
    const { posts, password } = await request.json();
    const correctPassword = process.env.EDIT_PASSWORD;

    // Verify password
    if (!correctPassword || password !== correctPassword) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get existing slugs to identify deleted posts
    const existingBlogDataPath = path.join(process.cwd(), "app", "blog", "blog-data.json");
    let existingSlugs: string[] = [];
    if (existsSync(existingBlogDataPath)) {
      const existingData = await import(existingBlogDataPath);
      existingSlugs = existingData.default.map((post: any) => post.slug);
    }

    const newSlugs = posts.map((post: any) => post.slug);
    const deletedSlugs = existingSlugs.filter((slug: string) => !newSlugs.includes(slug));

    // Delete HTML files for removed posts
    for (const slug of deletedSlugs) {
      const contentPath = path.join(process.cwd(), "public", "blog-texts", `${slug}.html`);
      if (existsSync(contentPath)) {
        await unlink(contentPath);
      }
    }

    // Save blog-data.json
    const blogData = posts.map((post: any) => ({
      link: post.link,
      slug: post.slug,
      date: post.date,
      title: post.title,
      cover: post.cover,
      description: post.description,
    }));

    const blogDataPath = path.join(process.cwd(), "app", "blog", "blog-data.json");
    await writeFile(blogDataPath, JSON.stringify(blogData, null, 2));

    // Save individual HTML files
    for (const post of posts) {
      if (post.content !== undefined) {
        const contentPath = path.join(
          process.cwd(),
          "public",
          "blog-texts",
          `${post.slug}.html`
        );
        await writeFile(contentPath, post.content);
      }
    }

    return NextResponse.json({ success: true, message: "Posts saved successfully" });
  } catch (error) {
    console.error("Error saving posts:", error);
    return NextResponse.json(
      { success: false, message: "Error saving posts" },
      { status: 500 }
    );
  }
}
