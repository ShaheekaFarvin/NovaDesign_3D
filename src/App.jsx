import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/layout/Navbar'
import Button from './components/ui/Button'
import ServiceCard from './components/ui/ServiceCard'
import RollingScene from './components/three/RollingScene'
import { services } from './data/services'
import { stats, process, projects, reasons, faqs } from './data/content'

gsap.registerPlugin(ScrollTrigger)

const field = 'w-full rounded-xl border border-neon/30 bg-surface/60 p-4 outline-none focus:border-neon'

function Section({ id, label, title, children }) {
  return (
    <section id={id} className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-neon">{label}</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
        <div className="mx-auto mt-3 h-px w-20 bg-linear-to-r from-transparent via-neon to-transparent" />
      </div>
      <div className="mt-10">{children}</div>
    </section>
  )
}

function Card({ top, title, text }) {
  return (
    <article className="glass rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-neon">
      {top && <p className="text-xs uppercase tracking-widest text-neon">{top}</p>}
      <h3 className="mt-2 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-soft">{text}</p>
    </article>
  )
}

function App() {
  const progress = useRef(0)
  const [note, setNote] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        progress.current = self.progress
        setScrolled(self.scroll() > 200)
      },
    })
    return () => trigger.kill()
  }, [])

  const submit = (event) => {
    event.preventDefault()
    setNote('Demo form: your details look good, but nothing was sent.')
  }

  return (
    <>
      <div aria-hidden="true" className={`pointer-events-none fixed inset-0 -z-10 transition-opacity md:opacity-100 ${scrolled ? 'opacity-25' : 'opacity-100'}`}>
        <RollingScene progress={progress} />
      </div>
      <Navbar />
      <main>
        <section id="home" className="mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-10 pt-80 md:justify-center md:py-28">
          <p className="text-sm uppercase tracking-[0.3em] text-neon">Creative Digital Agency</p>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold md:text-6xl">Turn Your Ideas Into Reality</h1>
          <p className="mt-6 max-w-xl text-lg text-soft">
            Websites, UI/UX, 3D experiences and branding crafted for ambitious businesses.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:gap-4">
            <Button href="#contact">Start a Project</Button>
            <Button href="#projects" variant="outline">View Our Work</Button>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="glass rounded-xl px-4 py-3">
                <dt className="text-sm text-soft">{label}</dt>
                <dd className="font-display text-2xl text-neon md:text-3xl">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Section id="about" label="About Us" title="More than a design studio">
          <div className="grid gap-6 md:grid-cols-3">
            <Card title="Who we are" text="A creative digital agency blending design, code and motion." />
            <Card title="Our mission" text="To turn ambitious ideas into experiences that feel alive." />
            <Card title="Our vision" text="A web where every brand has a space worth exploring." />
          </div>
        </Section>

        <Section id="services" label="Our Services" title="What we offer">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => <ServiceCard key={service.title} {...service} />)}
          </div>
        </Section>

        <Section id="process" label="How We Work" title="From idea to launch">
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {process.map(([step, title, text]) => <Card key={step} top={step} title={title} text={text} />)}
          </div>
        </Section>

        <Section id="projects" label="Concept Work" title="Featured projects">
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map(([title, type, text]) => <Card key={title} top={type} title={title} text={text} />)}
          </div>
        </Section>

        <Section id="why" label="Why NovaDesign" title="Crafted with care">
          <div className="grid gap-6 md:grid-cols-2">
            {reasons.map(([title, text]) => <Card key={title} title={title} text={text} />)}
          </div>
        </Section>

        <Section id="faq" label="FAQ" title="Questions, answered">
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map(([question, answer]) => (
              <details key={question} className="glass rounded-2xl p-5">
                <summary className="cursor-pointer font-semibold">{question}</summary>
                <p className="mt-3 text-soft">{answer}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section id="contact" label="Contact" title="Let's create together">
          <form onSubmit={submit} className="glass mx-auto max-w-xl space-y-4 rounded-3xl p-8">
            <input required aria-label="Name" placeholder="Your name" className={field} />
            <input required type="email" aria-label="Email" placeholder="Your email" className={field} />
            <textarea required minLength={10} rows={4} aria-label="Message" placeholder="Tell us about your project" className={field} />
            <button type="submit" className="rounded-full bg-neon px-8 py-3 font-semibold text-surface">
              Send Message
            </button>
            <p role="status" className="text-neon">{note}</p>
          </form>
        </Section>
      </main>
      <footer className="border-t border-neon/30 px-6 py-10 text-center text-soft">
        <p className="font-display text-2xl text-neon">NovaDesign</p>
        <p className="mt-2">Dream · Design · Develop</p>
        <p className="mt-2">hello@example.com</p>
        <p className="mt-4 text-sm">© 2026 NovaDesign. A fictional agency.</p>
      </footer>
    </>
  )
}

export default App
