import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = ['About', 'Services', 'Process', 'Projects', 'FAQ']

function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="glass fixed inset-x-4 top-3 z-50 mx-auto max-w-5xl rounded-2xl">
      <nav className="flex items-center justify-between px-5 py-2.5">
        <a href="#home" onClick={close} className="font-display text-lg font-bold">
          Nova<span className="text-neon">Design</span>
        </a>

        <ul className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-full mt-2 flex-col gap-4 rounded-2xl border border-neon/30 bg-surface p-5 shadow-2xl md:static md:mt-0 md:flex md:flex-row md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
          {[...links, 'Contact'].map((link) => (
            <li key={link} className={link === 'Contact' ? 'md:hidden' : ''}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={close}
                className="text-xs uppercase tracking-widest text-soft transition hover:text-neon"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="hidden rounded-full border border-neon/60 px-4 py-1.5 text-xs font-semibold text-neon transition hover:bg-neon hover:text-surface md:block">
          Let's Talk
        </a>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
    </header>
  )
}

export default Navbar
