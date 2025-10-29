import cardData from "./card-data.json"
import { Cards } from "../cards"
import Link from "next/link"


export default function About() {
  return (
    <>
    <section className="header-container inset">
      <header>who am i, <br />really?</header>
    </section>
    <section className="full-size-section inset">
        <h2>a short autobiography</h2>
        <p>
            My internet handle is wall03, and I write code on the side. I am a high school student 
        </p>
    </section>
    <section className="small-card-container">
      <Cards cardData={cardData} />
     
    </section>
    <section className='full-size-section inset'>
        <h2>about this site</h2>

        
    </section>
    </>
  );
}