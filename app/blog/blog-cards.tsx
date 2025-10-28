import Link from "next/link"
import blogCardData from "./blog-data.json"
import '../cards.css'


export function BlogCards() {
    let cardOutput = 'Nothing to see yet!';

    blogCardData.map((card, index) => (
        <Link key={index} href={card.slug}>
            <button className="blog-card inset">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <h5>{card.date}</h5>
            </button>
        </Link>
    ));

    return (
       <>
        {cardOutput}
       </>
    );
}