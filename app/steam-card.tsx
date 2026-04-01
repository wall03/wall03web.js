// steam user feature
import Link from "next/link";
import Image from "next/image";

const API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = "76561199002025572";
const BASE_URL = "https://api.steampowered.com";

export default async function SteamUser() {
    let playerData: { response: { players: { personaname: string }[] } };
    let gamesData: { response: { games?: unknown[] } };
    try {
        const [playerRes, gamesRes] = await Promise.all([
            fetch(
                `${BASE_URL}/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${STEAM_ID}`,
                { next: { revalidate: 3600 } },
            ),
            fetch(
                `${BASE_URL}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${STEAM_ID}`,
                { next: { revalidate: 3600 } },
            ),
        ]);
        playerData = await playerRes.json();
        gamesData = await gamesRes.json();
    } catch {
        return <div className="steam-gc">Could not reach Steam.</div>;
    }

    const userdata = playerData.response.players[0];
    const games = (gamesData.response.games ?? []) as { appid: number; name: string; img_icon_url: string; playtime_2weeks: number; }[];

    return (
        <>
            <div className="steam-gc">
                {games.map((game) => {
                    const playtime = game.playtime_2weeks >= 90
                        ? `${(game.playtime_2weeks / 60).toFixed(1)} hours`
                        : `${game.playtime_2weeks} min`;
                    const url = `https://store.steampowered.com/app/${game.appid}`;
                    return (
                        <Link href={url} key={game.appid} className="steam-gcc" target="_blank" rel="noopener noreferrer">
                            <Image src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt="" width={40} height={40} />
                            <div className="steam-txt">
                                <span className="steam-gn">{game.name}</span>
                                <span>{' -  '}</span>
                                <span className="steam-pt">{playtime} <span className="steam-recent">recently</span></span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}