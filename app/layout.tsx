import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./navbar";
import getFullYear from "get-full-year";

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;


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

async function Footer() {
  const data = await getFullYear(true);
  return(
    <section className="footer inset">
        <p>
					this is public domain work last updated in {data.year}<br />
          created by wall03 and next.js 
				</p>
    </section>
  );
}