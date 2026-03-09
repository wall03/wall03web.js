"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
	const pathname = usePathname();

	const navItems = [
		{ href: "/", label: "home" },
		{ href: "/about", label: "about" },
		{ href: "/blog", label: "blog" },
		{ href: "/projects", label: "projects" },
		{ href: "/contact", label: "contact" },
	];

	return (
		<div className="navbar-container">
			<nav>
				{navItems.map((item) => {
					const isActive =
						item.href === "/"
							? pathname === "/"
							: pathname === item.href ||
								pathname.startsWith(item.href + "/");

					return (
						<Link
							key={item.href}
							href={item.href}
							className={isActive ? "disabled" : ""}
						>
							<button className={isActive ? "disabled" : ""}>
								{item.label}
							</button>
						</Link>
					);
				})}
			</nav>
			<div className="announcement-bar inset">
				<p style={{ margin: 0 }}>
					<strong>announcements: </strong>I rewrote this in next.js
					lol <Link href="/blog/js-journey">more</Link>
				</p>
			</div>
		</div>
	);
}
