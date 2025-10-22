import Image from "next/image";

export default function Home() {
  return (
    <div className="main-container">
      <Navbar />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return(
    <nav>
      <button>home</button>
      <button>about</button>
      <button>blog</button>
      <button>projects</button>
      <button>contact</button>
    </nav>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear();
  return(
    <footer>
      <section>
        <p>© {currentYear} My App. All rights reserved.</p>
      </section>
    </footer>
  )
}