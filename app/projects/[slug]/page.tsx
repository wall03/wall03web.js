import projectData from "../project-data.json";
import fs from "fs/promises";
import path from "path";
import "../project-post.css";
import Image from "next/image";

export default async function Page({
	params,
}: {
	params: { slug: string } | Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = Array.isArray(projectData)
		? projectData.find((p: any) => p.slug === slug)
		: (projectData as any)[slug];

	if (!post) {
		return <div>Post not found</div>;
	}

	// Read the HTML content from the public folder
	const htmlPath = path.join(
		process.cwd(),
		"public",
		"project-texts",
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
				<p className="blog-date">Worked on during {post.date}</p>
				<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
			</section>
		</>
	);
}
