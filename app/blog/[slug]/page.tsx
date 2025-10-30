import blogData from "../blog-data.json"

export default async function Page({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = Array.isArray(blogData)
    ? blogData.find((p: any) => p.slug === slug)
    : (blogData as any)[slug]

  if (!post) {
    return <div>Post not found</div>
  }
  return (    
    <>
        <section className="header-container inset">
            <header>{post.title}</header>
        </section>
        <section className="blog-post-container inset">
            <p className="blog-date">Posted on {post.date}</p>
            <p>{post.content}</p>
        </section>
    </>
)
}