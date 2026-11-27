import { ArrowUp, Mail, MapPin, MessageCircle } from 'lucide-react'
import { contact, socials } from '../../data/content'
import { services } from '../../data/services'

const links = ['About', 'Founder', 'Services', 'Process', 'Projects', 'FAQ', 'Contact']
const external = { target: '_blank', rel: 'noopener noreferrer' }
const heading = 'text-sm font-bold uppercase tracking-widest text-neon'
const hover = 'transition hover:text-neon'
const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className="border-t border-neon/30 bg-surface/90 px-6 pt-14 pb-6 text-sm text-soft">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold text-white">
            Nova<span className="text-neon">Design</span>
          </p>
          <p className="mt-2 text-neon">We Create. You Grow.</p>
          <p className="mt-3 leading-relaxed">
            A creative digital studio building modern websites, engaging user experiences and digital solutions.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className={heading}>Quick Links</p>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className={hover}>{link}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={heading}>Services</p>
          <ul className="mt-4 space-y-2">
            {services.map((service) => <li key={service.title}>{service.title}</li>)}
          </ul>
        </div>

        <div>
          <p className={heading}>Get in Touch</p>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={`mailto:${contact.email}`} className={`flex items-center gap-2 break-all ${hover}`}>
                <Mail size={16} className="shrink-0 text-neon" /> {contact.email}
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${contact.whatsapp}`} {...external} className={`flex items-center gap-2 ${hover}`}>
                <MessageCircle size={16} className="shrink-0 text-neon" /> {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0 text-neon" /> {contact.location}
            </li>
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {socials.filter(([, url]) => url).map(([name, url]) => (
              <a key={name} href={url} {...external} className="rounded-full border border-neon/40 px-3 py-1 text-xs transition hover:bg-neon hover:text-surface">
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-neon/20 pt-5 text-xs sm:flex-row">
        <p>© {year} NovaDesign. All rights reserved.</p>
        <a href="#home" className={`flex items-center gap-1 ${hover}`}>
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  )
}

export default Footer
