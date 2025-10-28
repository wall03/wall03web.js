import { ContactCards } from "./contact-cards"
import "./contact-cards.css"

export default function Contact() {
  return (
    <>
    <section className="header-container inset">
      <header>my contact <br /> information.</header>
    </section>

    <section className="small-card-container">
      <ContactCards />
    </section>
    </>
  );
}