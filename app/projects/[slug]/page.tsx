import projectData from "../project-data.json"

export default function Page({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const post = Array.isArray(projectData)
    ? projectData.find((p: any) => p.slug === slug)
    : (projectData as any)[slug]

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