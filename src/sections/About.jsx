import { motion } from 'motion/react'

const values = [
  { title: 'Our Mission', text: 'To turn ambitious ideas into digital experiences that feel alive.' },
  { title: 'Our Vision', text: 'A web where every brand has a space worth exploring.' },
]

function About() {
  return (
    <section id="about" className="px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-5xl text-center"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-neon">About Us</p>
        <h2 className="mt-4 text-4xl font-bold md:text-5xl">Where design meets dimension</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-soft">
          NovaDesign is a creative digital agency blending design, code and 3D motion.
        </p>
        <div className="mt-14 grid gap-6 text-left md:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="rounded-3xl border border-white/10 bg-surface/70 p-8">
              <h3 className="text-2xl font-bold text-neon">{value.title}</h3>
              <p className="mt-3 text-soft">{value.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default About