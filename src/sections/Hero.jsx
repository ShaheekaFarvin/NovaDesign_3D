import { motion } from 'motion/react'
import Button from '../components/ui/Button'
import HeroScene from '../components/three/HeroScene'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.3em] text-neon">
            Creative Digital Agency
          </motion.p>

          <motion.h1 variants={fadeUp} className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
            Turn Your Ideas Into{' '}
            <span className="bg-linear-to-r from-neon to-plasma bg-clip-text text-transparent">
              Reality
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-soft lg:mx-0">
            Immersive 3D websites, thoughtful UI/UX and bold branding for ambitious ideas.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button href="#contact">Start a Project</Button>
            <Button href="#projects" variant="outline">View Our Work</Button>
          </motion.div>
        </motion.div>

        <div aria-hidden="true" className="h-[360px] w-full rounded-full bg-radial from-plasma/30 to-transparent to-70% lg:h-[560px]">
          <HeroScene />
        </div>
      </div>
    </section>
  )
}

export default Hero