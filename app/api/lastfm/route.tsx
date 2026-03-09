import { NextResponse } from "next/server";

const API_KEY = process.env.LASTFM_API_KEY;
const USERNAME = process.env.LASTFM_USERNAME;
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";
const LASTFM_PLACEHOLDER = "2a96cbd8b46e442fc41c2b86b821562f";

export async function GET() {
	const res = await fetch(
		`${BASE_URL}?method=user.gettoptracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=10&period=7day`,
		{ next: { revalidate: 3600 } },
	);
	const data = await res.json();
	const tracks: {
		name: string;
		artist: { name: string };
		url: string;
		playcount: string;
		"@attr": { rank: string };
	}[] = data.toptracks?.track ?? [];

	const infos = await Promise.all(
		tracks.map(async (track) => {
			try {
				const r = await fetch(
					`${BASE_URL}?method=track.getInfo&artist=${encodeURIComponent(track.artist.name)}&track=${encodeURIComponent(track.name)}&api_key=${API_KEY}&format=json`,
					{ next: { revalidate: 3600 } },
				);
				const d = await r.json();
				const albumName: string | null = d.track?.album?.title ?? null;
				const candidate: string | undefined =
					d.track?.album?.image?.find(
						(i: any) => i.size === "medium",
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
		const key = `${tracks[i].artist.name}::${albumName}`;
		if (!albumImages.has(key)) albumImages.set(key, image);
	});

	const formatted = tracks.map((track, i) => {
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

	return NextResponse.json(formatted);
}
