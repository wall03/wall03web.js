// components/WeeklyTopTracks
import Link from "next/link";

type Track = {
	name: string;
	artist: string;
	url: string;
	playcount: number;
	rank: number;
	image: string | null;
};

const API_KEY = process.env.LASTFM_API_KEY;
const USERNAME = process.env.LASTFM_USERNAME;
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";
const LASTFM_PLACEHOLDER = "2a96cbd8b46e442fc41c2b86b821562f";

export default async function TopTracks() {
	let data: { toptracks?: { track?: unknown[] } };
	try {
		const res = await fetch(
			`${BASE_URL}?method=user.gettoptracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=10&period=7day`,
			{ next: { revalidate: 10800 } },
		);
		data = await res.json();
	} catch {
		return <div className="lastFM-card">Could not reach Last.fm.</div>;
	}
	const raw: {
		name: string;
		artist: { name: string };
		url: string;
		playcount: string;
		"@attr": { rank: string };
	}[] = data.toptracks?.track ?? [];

	const infos = await Promise.all(
		raw.map(async (track) => {
			try {
				const r = await fetch(
					`${BASE_URL}?method=track.getInfo&artist=${encodeURIComponent(track.artist.name)}&track=${encodeURIComponent(track.name)}&api_key=${API_KEY}&format=json`,
					{ next: { revalidate: 10800 } },
				);
				const d = await r.json();
				const albumName: string | null = d.track?.album?.title ?? null;
				const candidate: string | undefined =
					d.track?.album?.image?.find(
						(i: { size: string; "#text": string }) => i.size === "medium",
					)?.["#text"];
				const image =
					candidate && !candidate.includes(LASTFM_PLACEHOLDER)
						? candidate
						: null;
				return { albumName, image };
			} catch {
				return { albumName: null, image: null };
			}
		}),
	);

	const albumImages = new Map<string, string | null>();
	infos.forEach(({ albumName, image }, i) => {
		if (!albumName) return;
		const key = `${raw[i].artist.name}::${albumName}`;
		if (!albumImages.has(key)) albumImages.set(key, image);
	});

	const tracks: Track[] = raw.map((track, i) => {
		const { albumName } = infos[i];
		const resolvedImage = albumName
			? (albumImages.get(`${track.artist.name}::${albumName}`) ?? null)
			: null;
		return {
			name: track.name,
			artist: track.artist.name,
			url: track.url,
			playcount: Number(track.playcount),
			rank: Number(track["@attr"]?.rank),
			image: resolvedImage,
		};
	});

	return (
		<div className="lastFM-card">
			{tracks.map((track) => (
				<Link className="lastFM-ci" href={track.url} key={track.rank}>
					<div className="lastFM-img-ph">
						{track.image && (
							<img
								src={track.image}
								alt={track.name}
								width={40}
								height={40}
								style={{ display: "block", objectFit: "cover" }}
							/>
						)}
					</div>
					<div className="lastFM-tr">{track.rank}.</div>
					<div className="lastFM-tn">{track.name}</div>
					<div className="lastFM-ta">{track.artist}</div>
					<div className="lastFM-tpc">{track.playcount} times</div>
				</Link>
			))}
		</div>
	);
}
