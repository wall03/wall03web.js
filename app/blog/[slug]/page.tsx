import blogData from "../blog-data.json";
import fs from "fs/promises";
import path from "path";
import "../blog-post.css";

export default async function Page({
	params,
}: {
	params: { slug: string } | Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = Array.isArray(blogData)
		? blogData.find((p: any) => p.slug === slug)
		: (blogData as any)[slug];

	if (!post) {
		return <div>Post not found</div>;
	}

	// Read the HTML content from the public folder
	const htmlPath = path.join(
		process.cwd(),
		"public",
		"blog-texts",
		`${slug}.html`,
	);
	let htmlContent = "";

	try {
		htmlContent = await fs.readFile(htmlPath, "utf-8");
	} catch (error) {
		console.error(`Error reading blog post: ${slug}`, error);
		htmlContent = "<p>Content not available</p>";
	}

	return (
		<>
			<section className="header-container inset">
				<header>{post.title}</header>
			</section>
			<section className="blog-post-container inset">
				<p className="blog-date">Posted on {post.date}</p>
				<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
			</section>
		</>
	);
}
