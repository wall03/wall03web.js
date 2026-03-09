import { BlogCards } from "./blog-cards";
import TopTracks from "../lastfm-card";
import SteamUser from "../steam-card";
import { Suspense } from 'react';

export default function Blog() {
	return (
		<>
			<section className="header-container inset">
				<header>my activity.</header>
			</section>
			<span>
				A collection of blog posts, Mastodon posts, and other account
				activity
			</span>
			<section className="activity-container inset">
				<div className="lastFM-cc">
					<h2>Top tracks this week</h2>
					<Suspense fallback={<Loading />}>
						<TopTracks />
					</Suspense>
				</div>
				<div className="steam-cc">
					<h2>Recently played games on Steam</h2>
					<Suspense fallback={<Loading />}>
						<SteamUser />
					</Suspense>
				</div>
			</section>
			<h2 className="section-header">Older posts</h2>
			<section className="blog-card-container">
				<BlogCards />
			</section>
		</>
	);
}

function Loading() {
	return (
		<div className="ph-gc">
			<div className="ph-ci">
				<div className="ph-img"></div>
			</div>
			<div className="ph-ci">
				<div className="ph-img"></div>
			</div>
			<div className="ph-ci">
				<div className="ph-img"></div>
			</div>
			<div className="ph-ci">
				<div className="ph-img"></div>
			</div>
			<div className="ph-ci">
				<div className="ph-img"></div>
			</div>
		</div>
	);
}