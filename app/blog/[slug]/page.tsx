import blogData from "../blog-data.json"

export default function Page({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
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
            <p>{post.content}</p>
        </section>
    </>
)
}