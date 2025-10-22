'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/', label: 'home' },
    { href: '/about', label: 'about' },
    { href: '/blog', label: 'blog' },
    { href: '/projects', label: 'projects' },
    { href: '/contact', label: 'contact' },
  ]

  return (
    <nav>
      {navItems.map((item) => (
        <Link 
          key={item.href}
          href={item.href}
          className={pathname === item.href ? 'disabled' : ''}
        >
          <button disabled={pathname === item.href}>
            {item.label}
          </button>
        </Link>
      ))}
    </nav>
  )
}