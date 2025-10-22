import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./navbar"

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


export const metadata: Metadata = {
  title: "wall03 website",
  description: "blog, portfolio, and biography of wall03",
};

export default function RootLayout({
children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <div className="main-container">
            <Navbar />
            {children}
            <Footer />

          </div>
      </body>
    </html>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  return(
    <footer>
      <section>
        <p>
					this is public domain work<br />
					coded in collaboration with
					<a href="https://github.com/ItsPi3141/">Pi</a> and <a href="https://twidilers.com/">Oliver</a><br />
				</p>
      </section>
    </footer>
  );
}