import Link from "next/link";
import Image from "next/image";
import blogCardData from "./blog-data.json";
import './blog-card.css';


export function BlogCards() {
    const cardOutput = blogCardData && blogCardData.length ? (
        blogCardData.map((card, index) => (
            <Link key={index} href={card.link}>
                <button className="blog-card inset">
                    <Image
                        className="blog-img"
                        src={card.cover && card.cover.startsWith('/') ? card.cover : `/${card.cover}`}
                        alt={card.description || card.title}
                        width={600}
                        height={200}
                    />
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>
                    <h5>Posted on {card.date}</h5>
                </button>
            </Link>
        ))
    ) : (
        <p>Nothing to see yet!</p>
    );

    return <>{cardOutput}</>;
}