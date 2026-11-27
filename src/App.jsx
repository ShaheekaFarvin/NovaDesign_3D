import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Button from './components/ui/Button'
import ServiceCard from './components/ui/ServiceCard'
import Works from './sections/Works'
import { services } from './data/services'
import { contact, testimonials, process, reasons, faqs } from './data/content'

const RollingScene = lazy(() => import('./components/three/RollingScene'))
gsap.registerPlugin(ScrollTrigger)

const field = 'w-full rounded-xl border border-neon/30 bg-surface/80 p-3 outline-none focus:border-neon'
const mailLink = `mailto:${contact.email}`
const chatLink = `https://wa.me/${contact.whatsapp}`
const external = { target: '_blank', rel: 'noopener noreferrer' }

function Section({ id, label, title, children }) {
  return (
    <section id={id} className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-neon">{label}</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  )
}

function Card({ top, title, text }) {
  return (
    <article className="glass rounded-2xl p-5">
      {top && <p className="text-xs tracking-widest text-neon">{top}</p>}
      <h3 className="mt-2 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-soft">{text}</p>
    </article>
  )
}

function InquiryForm() {
  const [note, setNote] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    if (!data.name.trim() || data.description.trim().length < 10) {
      setNote('Please enter your name and at least 10 characters about the project.')
      return
    }
    const body = `Name: ${data.name}\nEmail: ${data.email}\nProject type: ${data.type}\nBudget: ${data.budget}\n\n${data.description}`
    if (event.nativeEvent.submitter?.value === 'email') {
      window.location.href = `${mailLink}?subject=${encodeURIComponent('Project inquiry')}&body=${encodeURIComponent(body)}`
      setNote('Your email app should open. Press Send there to finish.')
    } else {
      window.open(`${chatLink}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer')
      setNote('WhatsApp should open. Press Send there to finish.')
    }
  }

  return (
    <form onSubmit={submit} className="glass mx-auto max-w-xl space-y-4 rounded-3xl p-6">
      <input name="name" required aria-label="Name" placeholder="Your name" className={field} />
      <input name="email" type="email" required aria-label="Email" placeholder="Your email" className={field} />
      <select name="type" required defaultValue="" aria-label="Project type" className={field}>
        <option value="" disabled>Project type</option>
        {services.map((s) => <option key={s.title}>{s.title}</option>)}
      </select>
      <select name="budget" required defaultValue="" aria-label="Budget range" className={field}>
        <option value="" disabled>Budget range</option>
        <option>Under LKR 50,000</option>
        <option>LKR 50,000 - 150,000</option>
        <option>Above LKR 150,000</option>
        <option>Not sure yet</option>
      </select>
      <textarea name="description" required minLength={10} rows={4} aria-label="Project description" placeholder="Describe your project" className={field} />
      <div className="flex flex-wrap gap-3">
        <Button type="submit" value="whatsapp">Send via WhatsApp</Button>
        <Button type="submit" value="email" variant="outline">Send via Email</Button>
      </div>
      <p role="status" className="text-sm text-neon">{note}</p>
    </form>
  )
}

function App() {
  const progress = useRef(0)
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

  return (
    <>
      <div aria-hidden="true" className={`pointer-events-none fixed inset-0 -z-10 transition-opacity md:opacity-100 ${scrolled ? 'opacity-25' : 'opacity-100'}`}>
        <Suspense fallback={null}>
          <RollingScene progress={progress} />
        </Suspense>
      </div>
      <Navbar />
      <main>
        <section id="home" className="mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-6 pb-10 pt-80 md:justify-center md:py-28">
          <p className="text-xs uppercase tracking-[0.3em] text-neon">Creative Web Design & Digital Experience Studio</p>
          <h1 className="mt-5 max-w-xl text-4xl font-bold md:text-6xl">We Create. You Grow.</h1>
          <p className="mt-5 max-w-lg text-soft">Modern websites, engaging experiences and digital solutions for your business.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contact">Start Your Project</Button>
            <Button href="#projects" variant="outline">View Our Work</Button>
          </div>
        </section>

        <Section id="about" label="About NovaDesign" title="A creative digital studio">
          <p className="glass mx-auto max-w-3xl rounded-3xl p-8 text-center text-soft">
            NovaDesign is a creative digital studio focused on building modern websites, engaging user experiences, and innovative digital solutions. We combine creative design, modern technologies, and thoughtful development to help businesses establish a strong digital presence.
          </p>
        </Section>

        <Section id="founder" label="Meet the Founder" title="Shaheeka Farvin">
          <div className="glass mx-auto max-w-2xl rounded-3xl p-8 text-center">
            <p className="text-neon">Founder | Web Developer | UI/UX Designer | Graphic Designer</p>
            <p className="mt-4 text-soft">NovaDesign is a founder-led studio. You work directly with the person who designs and builds your project.</p>
          </div>
        </Section>

        <Section id="services" label="Our Services" title="What we offer">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => <ServiceCard key={s.title} {...s} />)}
          </div>
        </Section>

        <Section id="process" label="Our Creative Process" title="From idea to launch">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {process.map(([step, title, text]) => <Card key={step} top={step} title={title} text={text} />)}
          </div>
        </Section>

        <Works />

        <Section id="why" label="Why Choose NovaDesign?" title="Crafted with care">
          <div className="grid gap-4 md:grid-cols-3">
            {reasons.map(([title, text]) => <Card key={title} title={title} text={text} />)}
          </div>
        </Section>

        {testimonials.length > 0 && (
          <Section id="testimonials" label="Testimonials" title="Client feedback">
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((t) => <Card key={t.name} title={t.name} text={t.text} />)}
            </div>
          </Section>
        )}

        <Section id="faq" label="FAQ" title="Questions, answered">
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="glass rounded-2xl p-5">
                <summary className="cursor-pointer font-semibold">{q}</summary>
                <p className="mt-3 text-sm text-soft">{a}</p>
              </details>
            ))}
          </div>
        </Section>

        <section className="px-6 py-24 text-center">
          <h2 className="text-3xl font-bold md:text-5xl">Have an Idea? Let's Build Something Amazing.</h2>
          <Button href="#contact" className="mt-8">Start Your Project</Button>
        </section>

        <Section id="contact" label="Contact" title="Tell us about your project">
          <InquiryForm />
          <div className="mt-6 flex flex-col items-center gap-2 text-soft">
            <a href={mailLink} className="hover:text-neon">{contact.email}</a>
            <a href={chatLink} {...external} className="hover:text-neon">WhatsApp: {contact.phone}</a>
            <p>{contact.location}</p>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  )
}

export default App