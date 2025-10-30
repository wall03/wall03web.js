import cardData from "./card-data.json"
import { Cards } from "../cards"
import Link from "next/link"


export default function About() {
  return (
    <>
    <section className="header-container inset">
      <header>who am I, <br />really?</header>
    </section>
    <section className="full-size-section inset">
        <h2>a short autobiography</h2>
        <p>
            Hello! I'm a high school student in New York. I am currently taking classes in engineering and film along with normal high school stuff. 
        </p>
        <p>
            A couple of friends wanted to expand their Python skills and start a website. After about 10 seconds of thought, we chose a Twitter clone.
            I was chosen as the frontend developer, and over time I wrote my own tangled mess of Javascript amounting to a jumble of fetch APIs that should have just been written in React.
            We're starting a new website soon in NextJS with more planning beforehand, but I decided to dip my toes in the water by rewriting this static website in NextJS.
        </p>
        <p>
            Right now I'm most active on Discord and Reddit, but if you want more up-to-date information check my <Link href="/contact">contact page.</Link>
        </p>
    </section>
    <section className="small-card-container">
      <Cards cardData={cardData} />
     
    </section>
    </>
  );
}