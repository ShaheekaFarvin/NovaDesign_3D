import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import PortalScene from '../components/three/PortalScene'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function PortalReveal() {
  const root = useRef(null)
  const progress = useRef(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 1,
          },
        })

        tl.eventCallback('onUpdate', () => {
          progress.current = tl.progress()
        })

        tl.to('.portal-intro', { opacity: 0, y: -80, duration: 0.25 }, 0)
          .to('.parallax-slow', { y: -150, duration: 1 }, 0)
          .to('.parallax-fast', { y: -400, duration: 1 }, 0)
          .fromTo(
            '.portal-reveal',
            { clipPath: 'circle(0% at 50% 50%)' },
            { clipPath: 'circle(75% at 50% 50%)', duration: 0.35 },
            0.55,
          )
          .fromTo(
            '.portal-content',
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.15 },
            0.8,
          )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative h-screen overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        <PortalScene progress={progress} />
      </div>

      <div aria-hidden="true" className="parallax-slow absolute left-[10%] top-2/3 h-24 w-24 rounded-full bg-neon/20 blur-xl" />
      <div aria-hidden="true" className="parallax-fast absolute right-[12%] top-3/4 h-16 w-16 rounded-full bg-plasma/40 blur-md" />

      <div className="portal-intro absolute inset-x-0 top-28 px-6 text-center">
        <h2 className="text-3xl font-bold md:text-5xl">Step Into Our Universe</h2>
        <p className="mt-3 text-soft">Scroll to expand</p>
      </div>

      <div className="portal-reveal absolute inset-0 flex items-center justify-center bg-linear-to-br from-surface via-night to-plasma/40 px-6 text-center">
        <div className="portal-content max-w-3xl">
          <h2 className="text-4xl font-bold md:text-6xl">Ideas, Expanded.</h2>
          <p className="mt-6 text-lg text-soft">
            We turn small sparks into immersive digital experiences.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PortalReveal