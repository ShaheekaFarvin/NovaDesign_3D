import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../../data/navLinks'
import Button from '../ui/Button'

function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-night/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" onClick={close} className="font-display text-xl font-bold">
          Nova<span className="text-neon">Design</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-soft transition hover:text-neon">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button href="#contact" className="hidden md:inline-flex">
          Start a Project
        </Button>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-4 border-t border-white/10 px-6 py-6 md:hidden">
          {[...navLinks, { label: 'Contact', href: '#contact' }].map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={close} className="block text-soft hover:text-neon">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

export default Navbar