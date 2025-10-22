import Link from "next/link";
import cardData from "./card-data.json"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


export default function About() {
  return (
    <>
    <section className="header-container">
      <h1>hello. <br />I'm wall03</h1>
    </section>
    <section className="full-size-container">
        <h2>biography</h2>
            <p>Lorem ipsum dolor sit amet</p>
    </section>
    <section className="small-card-container">
      <Cards />
     
    </section>
    </>
  );
}

function Cards() {
  return (
    <>
      {cardData.map((card, index) => (
        <Link key={index} href={card.link}>
          <button className="small-card">
            <h1>{card.title}</h1>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </Link>
      ))}
    </>
  );
}