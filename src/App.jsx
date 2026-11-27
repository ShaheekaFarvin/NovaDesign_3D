import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
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
    <form onSubmit={submit} className="glass space-y-3 rounded-3xl p-6">
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
      <textarea name="description" required minLength={10} rows={3} aria-label="Project description" placeholder="Describe your project" className={field} />
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
  const [aboutActive, setAboutActive] = useState(false)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        progress.current = self.progress
        setScrolled(self.scroll() > 200)
      },
    })
    const aboutTrigger = ScrollTrigger.create({
      trigger: '#about',
      start: 'top 70%',
      end: 'bottom 30%',
      onToggle: (self) => setAboutActive(self.isActive),
    })
    return () => {
      trigger.kill()
      aboutTrigger.kill()
    }
  }, [])

  return (
    <>
      <div aria-hidden="true" className={`pointer-events-none fixed inset-0 -z-10 transition-opacity duration-700 ${scrolled ? 'opacity-40' : 'opacity-100'}`}>
        <Suspense fallback={null}>
          <RollingScene progress={progress} aboutActive={aboutActive} />
        </Suspense>
      </div>
      <Navbar />
      <main>
        <section id="home" className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-6 pb-32 pt-80 md:justify-center md:pt-28">
          <p className="text-xs uppercase tracking-[0.3em] text-neon">Creative Web Design & Digital Experience Studio</p>
          <h1 className="mt-5 text-4xl font-bold md:text-6xl">
            <span className="block">We Create.</span>
            <span className="block text-neon">You Grow.</span>
          </h1>
          <p className="mt-5 max-w-lg text-soft">Modern websites, engaging experiences and digital solutions for your business.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contact">Start Your Project</Button>
            <Button href="#projects" variant="outline">View Our Work</Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-soft">
            {['Founder-led studio', 'Mobile-friendly design', '3D & motion'].map((item) => (
              <li key={item}><span className="text-neon">✦</span> {item}</li>
            ))}
          </ul>

          <a href="#about" className="mt-8 self-start text-xs uppercase tracking-widest text-soft hover:text-neon">
            Scroll to explore <span className="inline-block motion-safe:animate-bounce">↓</span>
          </a>

          <div aria-hidden="true" className="absolute inset-x-0 bottom-6 overflow-hidden border-y border-neon/20 py-3">
            <div className="marquee flex w-max">
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex shrink-0">
                  {services.map((service) => (
                    <li key={service.title} className="whitespace-nowrap px-6 text-xs uppercase tracking-widest text-soft">
                      {service.title} <span className="ml-10 text-neon">◆</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-24">
          <div className="w-full lg:ml-auto lg:w-3/5">
            <p className="text-xs uppercase tracking-[0.4em] text-neon">About NovaDesign</p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">A creative digital studio</h2>
            <p className="mt-5 leading-relaxed text-soft">
              NovaDesign is a creative digital studio focused on building modern websites, engaging user experiences, and innovative digital solutions. We combine creative design, modern technologies, and thoughtful development to help businesses establish a strong digital presence.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Card top="01" title="Mission" text="Turn ideas into digital experiences that help businesses grow." />
              <Card top="02" title="Vision" text="A strong, memorable online presence for every business we serve." />
              <Card top="03" title="Approach" text="Listen first, design with purpose, build with care." />
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {['React', 'Node.js', 'Tailwind CSS', 'Three.js', 'GSAP', 'PHP', 'MySQL', 'MongoDB'].map((tool) => (
                <li key={tool} className="rounded-full border border-neon/30 px-4 py-1.5 text-xs text-soft">{tool}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#services">Explore Services</Button>
              <Button href="#founder" variant="outline">Meet the Founder</Button>
            </div>
          </div>
        </section>

        <section id="founder" className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-24">
          <div className="glass grid w-full items-center gap-8 rounded-3xl p-6 md:p-10 lg:grid-cols-3">
            <div className="text-center">
              <img src="/founder.png" alt="Shaheeka Farvin" className="mx-auto h-40 w-40 rounded-full border-2 border-neon object-cover" />
              <h2 className="mt-5 text-3xl font-bold">Shaheeka Farvin</h2>
              <p className="mt-2 text-sm text-neon">Founder, NovaDesign</p>
              <p className="mt-1 text-sm text-soft">{contact.location}</p>
            </div>

            <div className="lg:col-span-2">
              <p className="text-xs uppercase tracking-[0.4em] text-neon">Meet the Founder</p>
              <p className="mt-4 text-lg leading-relaxed text-soft">
                I'm a BICT (Hons) undergraduate at Rajarata University of Sri Lanka. I started NovaDesign to turn ideas into modern websites. You work directly with me, from the first idea to launch.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Card title="Web Developer" text="Responsive websites and web applications." />
                <Card title="UI/UX Designer" text="Clear layouts and easy user journeys." />
                <Card title="Graphic Designer" text="Visuals and brand identity." />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#contact">Work With Me</Button>
                <Button href="#projects" variant="outline">See My Projects</Button>
              </div>
            </div>
          </div>
        </section>

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

        <section id="contact" className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-24">
          <div className="grid w-full items-start gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="text-xs uppercase tracking-[0.4em] text-neon">Contact</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Tell us about your project</h2>
              <p className="mt-4 text-soft">Share your idea using the form, or reach us directly.</p>

              <ul className="mt-6 space-y-3">
                {[
                  { icon: Mail, label: 'Email', value: contact.email, href: mailLink },
                  { icon: MessageCircle, label: 'WhatsApp', value: contact.phone, href: chatLink },
                  { icon: MapPin, label: 'Location', value: contact.location },
                ].map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="glass flex items-center gap-4 rounded-2xl p-4">
                    <Icon aria-hidden="true" size={20} className="shrink-0 text-neon" />
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-widest text-neon">{label}</p>
                      {href ? (
                        <a href={href} {...(href.startsWith('http') ? external : {})} className="break-all hover:text-neon">{value}</a>
                      ) : (
                        <p>{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <InquiryForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App