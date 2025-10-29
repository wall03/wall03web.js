import cardData from "./card-data.json"
import {Cards} from "./cards"


export default function Home() {
  return (
    <>
    <section className="header-container inset">
      <header>hello. <br />I'm wall03.</header>
    </section>

    <section className="small-card-container">
      <Cards cardData={cardData} />
     
    </section>
    </>
  );
}