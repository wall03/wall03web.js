"use client";

import { useState, useEffect } from "react";
import blogCardData from "../blog/blog-data.json";
import "./edit.css";

interface BlogPost {
	link: string;
	slug: string;
	date: string;
	title: string;
	cover: string;
	description: string;
	content?: string;
}

export default function EditPosts() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [password, setPassword] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		// Load blog data and content
		const loadPosts = async () => {
			const postsWithContent = await Promise.all(
				blogCardData.map(async (post) => {
					try {
						const response = await fetch(
							`/blog-texts/${post.slug}.html`,
						);
						const content = await response.text();
						return { ...post, content };
					} catch (error) {
						return { ...post, content: "" };
					}
				}),
			);
			setPosts(postsWithContent);
		};
		loadPosts();
	}, []);

	const handlePasswordCheck = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/check-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ password }),
			});
			const data = await response.json();
			if (data.success) {
				setIsAuthenticated(true);
				setMessage("Access granted!");
			} else {
				setMessage("Incorrect password");
			}
		} catch (error) {
			setMessage("Error checking password");
		}
		setLoading(false);
	};

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/save-posts", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ posts, password }),
			});
			const data = await response.json();
			if (data.success) {
				setMessage("Posts saved successfully!");
			} else {
				setMessage("Error saving posts");
			}
		} catch (error) {
			setMessage("Error saving posts");
		}
		setLoading(false);
	};

	const updatePost = (
		index: number,
		field: keyof BlogPost,
		value: string,
	) => {
		const updatedPosts = [...posts];
		updatedPosts[index] = { ...updatedPosts[index], [field]: value };
		setPosts(updatedPosts);
	};

	const addNewPost = () => {
		const newPost: BlogPost = {
			link: "blog/new-post",
			slug: "new-post",
			date: new Date().toISOString().split("T")[0],
			title: "New Post",
			cover: "/blog1.jpg",
			description: "Enter description here",
			content: "<p>Enter your blog content here</p>",
		};
		setPosts([...posts, newPost]);
		setMessage("New post added! Don't forget to submit changes.");
	};

	const deletePost = (index: number) => {
		if (
			confirm(`Are you sure you want to delete "${posts[index].title}"?`)
		) {
			const updatedPosts = posts.filter((_, i) => i !== index);
			setPosts(updatedPosts);
			setMessage("Post deleted! Don't forget to submit changes.");
		}
	};

	if (!isAuthenticated) {
		return (
			<div style={{ maxWidth: "400px", margin: "0 auto" }}>
				<h1>Blog Editor</h1>
				<p>Please enter password to access the editor:</p>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onKeyDown={(e) =>
						e.key === "Enter" && handlePasswordCheck()
					}
				/>
				<button
					onClick={handlePasswordCheck}
					disabled={loading}
					style={{
						fontSize: "1rem",
						cursor: loading ? "not-allowed" : "pointer",
					}}
				>
					{loading ? "Checking..." : "Login"}
				</button>
				{message && (
					<p style={{ marginTop: "1rem", color: "red" }}>{message}</p>
				)}
			</div>
		);
	}

	return (
		<div>
			<h1>Edit Blog Posts</h1>
			<p style={{ marginBottom: "1rem" }}>
				Logged in as admin. Edit the posts below and click Submit to
				save changes.
			</p>
			<button
				onClick={addNewPost}
				style={{
					padding: "0.75rem 1.5rem",
					fontSize: "1rem",
					backgroundColor: "#10a37f",
					color: "white",
					border: "none",
					borderRadius: "5px",
					cursor: "pointer",
					marginBottom: "2rem",
				}}
			>
				+ Add New Post
			</button>

			{posts.map((post, index) => (
				<div key={post.slug}>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: "1rem",
						}}
					>
						<h2>
							Post {index + 1}: {post.title}
						</h2>
						<button
							onClick={() => deletePost(index)}
							style={{
								padding: "0.5rem 1rem",
								backgroundColor: "#dc2626",
								color: "white",
								border: "none",
								borderRadius: "5px",
								cursor: "pointer",
							}}
						>
							Delete Post
						</button>
					</div>

					<div style={{ marginBottom: "1rem" }}>
						<label
							style={{
								display: "block",
								fontWeight: "bold",
								marginBottom: "0.5rem",
							}}
						>
							Title:
						</label>
						<input
							type="text"
							value={post.title}
							onChange={(e) =>
								updatePost(index, "title", e.target.value)
							}
						/>
					</div>

					<div style={{ marginBottom: "1rem" }}>
						<label
							style={{
								display: "block",
								fontWeight: "bold",
								marginBottom: "0.5rem",
							}}
						>
							Slug:
						</label>
						<input
							type="text"
							value={post.slug}
							onChange={(e) =>
								updatePost(index, "slug", e.target.value)
							}
						/>
					</div>

					<div style={{ marginBottom: "1rem" }}>
						<label
							style={{
								display: "block",
								fontWeight: "bold",
								marginBottom: "0.5rem",
							}}
						>
							Date:
						</label>
						<input
							type="date"
							value={post.date}
							onChange={(e) =>
								updatePost(index, "date", e.target.value)
							}
						/>
					</div>

					<div style={{ marginBottom: "1rem" }}>
						<label
							style={{
								display: "block",
								fontWeight: "bold",
								marginBottom: "0.5rem",
							}}
						>
							Cover Image Path:
						</label>
						<input
							type="text"
							value={post.cover}
							onChange={(e) =>
								updatePost(index, "cover", e.target.value)
							}
						/>
					</div>

					<div style={{ marginBottom: "1rem" }}>
						<label
							style={{
								display: "block",
								fontWeight: "bold",
								marginBottom: "0.5rem",
							}}
						>
							Description:
						</label>
						<textarea
							value={post.description}
							onChange={(e) =>
								updatePost(index, "description", e.target.value)
							}
						/>
					</div>

					<div style={{ marginBottom: "1rem" }}>
						<label
							style={{
								display: "block",
								fontWeight: "bold",
								marginBottom: "0.5rem",
							}}
						>
							Content (HTML):
						</label>
						<textarea
							value={post.content || ""}
							style={{ minHeight: "200px" }}
							onChange={(e) =>
								updatePost(index, "content", e.target.value)
							}
						/>
					</div>
				</div>
			))}

			<div
				className="inset"
				style={{
					position: "sticky",
					bottom: "1rem",
					width: "100%",
					borderRadius: "20px",
					backgroundColor: "var(--bg-accent)",
					padding: "1rem",
				}}
			>
				<button
					onClick={handleSubmit}
					disabled={loading}
					style={{
						padding: "1rem 2rem",
						fontSize: "1.2rem",
						backgroundColor: "#0070f3",
						color: "white",
						border: "none",
						borderRadius: "5px",
						cursor: loading ? "not-allowed" : "pointer",
					}}
				>
					{loading ? "Saving..." : "Submit Changes"}
				</button>
				{message && (
					<span style={{ marginLeft: "1rem" }}>{message}</span>
				)}
			</div>
		</div>
	);
}
