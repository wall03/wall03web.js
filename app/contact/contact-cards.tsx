import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import "../cards.css"


export function ContactCards() {
  return (
    <>
	 <h2>Messaging</h2>
		{getCard("email","fa-solid fa-envelope", "mailto:wall03@wall03.blue")}
		{getCard("discord","fa-brands fa-discord","https://discord.com/channels/@me/615153271794827296/")}
	<div className="break"></div>
	<h2>Work</h2>
		{getCard("wikipedia", "fa-brands fa-wikipedia-w", "https://en.wikipedia.org/wiki/User:wall03")}
		{getCard("github", "fa-brands fa-github","https://github.com/wall03")}
		{getCard("OSM","fa-solid fa-map","https://www.openstreetmap.org/user/wall03")}
		{getCard("printables","fa-solid fa-cube","https://www.printables.com/@wall03_556316")}
		{getCard("etsy","fa-brands fa-etsy","https://www.etsy.com/shop/CatThingsThatAreCute")}
	<div className="break"></div>
	<h2>Socials</h2>
		{getCard("reddit","fa-brands fa-reddit","https://www.reddit.com/user/not_wall03")}
		{getCard("mastodon","fa-brands fa-mastodon","https://urbanists.social/@wall03")}
		{getCard("Twitter","fa-brands fa-twitter","https://twitter.com/not_wall03")}
	<div className="break"></div>
	<h2>Gaming</h2>
		{getCard("Steam","fa-brands fa-steam","https://steamcommunity.com/id/wall03/")}
		{getCard("WOTC","fa-brands fa-wizards-of-the-coast","https://steamcommunity.com/id/wall03/")}
	 <div className="break"></div>
	<h2>Forums</h2>
		{getCard("Ars","fa-solid fa-gears","https://arstechnica.com/civis/members/wall03.841621/")}
		{getCard("Blu-ray","fa-solid fa-compact-disc", "https://www.blu-ray.com/community/profile.php?u=868085")}
	 <div className="break"></div>
	 <h2>Other cool people</h2>
	 	{getCard("Oliver","fa-solid fa-user-tie","https://hub.twidilers.com")}
		{getCard("Derin","fa-solid fa-user-secret","https://derin.twidilers.com")}
		{getCard(".pi","fa-solid fa-pizza-slice","https://www.blu-ray.com/community/profile.php?u=868085")}
    </>
	);
}

export function getCard(name: string, icon: string, link: string) {
  return (
    <a className="contact-card inset" href={link} title={name} id={name}>
      <FontAwesomeIcon icon={icon as any} />
      <span>{name}</span>
    </a>
  )
}