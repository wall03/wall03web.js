import { BlogCards } from "./blog-cards"

export default function Blog() {
  return (
    <>
    <section className="header-container inset">
      <header>my stream <br />of conciousness.</header>
    </section>
    <section className="blog-card-container">
      <BlogCards />
    </section>

    </>
  );
}