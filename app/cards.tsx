import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import "./cards.css"



export function Cards({ cardData }: { cardData: { title: string; link: string }[] }) {
  return (
    <>
      {cardData.map((card, index) => (
        <Link key={index} href={card.link}>
          <button className="small-card inset">
            <h2>{card.title}</h2>
            <FontAwesomeIcon className="arrow-icon" icon={faArrowRight} />
          </button>
        </Link>
      ))}
    </>
  );
}