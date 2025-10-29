import { ProjectCards } from "./cards";


export default function Projects() {
  return (
    <>
      <section className="header-container inset">
        <header>my <br /> projects.</header>
      </section>
      <section className="blog-card-container">
        <ProjectCards />
      </section>

    </>
  );
}