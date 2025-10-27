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
            Hey! I'm wall03! I use he/him pronouns, and I live in New York. I'm a high school student and Quaker experimenting with spirituality and philosophy.
            I am a self-taught part-time web developer/designer. Every so often my design tastes change, and therefore this website does. It's a work in progress. 					</p>
        <p>
            I have a variety of interests, including playing Euro Truck Simulator 2 on my Steam Deck, singing in a chorus, playing D&D, doodling, walking, and randomly being on stage crew at school and town plays.
        </p>
    </section>
    <section className="small-card-container">
      <Cards cardData={cardData} />
     
    </section>
    <section className='full-size-section inset'>
        <h2>about this site</h2>
            <h3>Design</h3>
            <p>
                Every so often my design tastes change, so this website changes with it. I'm still coding the latest incarnation of the site. This redesign is special, because it's built from the ground
                up with a new layout system (cards) which makes this easy for me to add new parts to the website.
            </p>
            <p>
                I used to include a change log but I don't like looking at the past because a lot of the time I didn't do the best things then so I removed it and here we are ;). You can look at my <a href="../blog/">blog</a> which is mostly talking about this website
            </p>

            <h3>Hosting</h3>
            <strong>					
                <p>You can read more about my hosting journey 
                    <Link href="../blog/2"> here</Link>
                </p>
            </strong>
            
            <p>
                Update 11/2024: This site was down for a couple months as hosting expired. I dragged my feet for a while before my friend started hosting  <a href="https://twidlers.com">his site</a> and put up my site up for me. Thanks Oliver! 
            </p>
            <p>
                    The domain is registered through domain.com. It was cheap and .blue is such a fun and not-used TLD.
            </p>
            <h3>Github</h3>
            <p>
                Here's the <Link href="https://github.com/wall03/wall03web.js">github link</Link>. It's not always up to date but I try my best. You can always download this page from your web browser if you really want to
            </p>
            <p>
                Why did I decide to make this website public domain? I'd recommend reading the <Link href="../blog/1.html">blog post</Link> about it.
            </p>
        
    </section>
    </>
  );
}