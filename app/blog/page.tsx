import { BlogCards } from "./blog-cards"

export default function Blog() {
  return (
    <>
    <section className="header-container inset">
      <header>my stream <br />of conciousness.</header>
    </section>
          <span>Also go check out my <a href="https://urbanists.social/@wall03">Mastodon</a> for more frequent posts</span>

    <section className="blog-card-container">
      <BlogCards />
    </section>

    </>
  );
}