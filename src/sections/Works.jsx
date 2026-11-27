import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { projects } from '../data/content'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const external = { target: '_blank', rel: 'noopener noreferrer' }

function Works() {
  const [activeProject, setActiveProject] = useState(null)
  const root = useRef(null)
  const closeButton = useRef(null)

  useEffect(() => {
    if (!activeProject) return undefined

    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setActiveProject(null)
    }

    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
      previousFocus?.focus?.()
    }
  }, [activeProject])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray('.work-orbit-card')
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=100%',
            pin: true,
            anticipatePin: 1,
            scrub: 1.3,
          },
        })

        cards.forEach((card, index) => {
          const position = index * 0.1
          const angle = (index / cards.length) * Math.PI * 2 - Math.PI / 2
          const startLeft = 50 + Math.cos(angle) * 25
          const startTop = 50 + Math.sin(angle) * 29

          timeline
            .fromTo(
              card,
              {
                left: `${startLeft}%`,
                top: `${startTop}%`,
                scale: 0.78,
                autoAlpha: 1,
              },
              {
                left: `${card.dataset.left}%`,
                top: `${card.dataset.top}%`,
                scale: 1,
                autoAlpha: 1,
                duration: 1,
                ease: 'none',
              },
              position,
            )
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="projects" ref={root} className="works-section">
      <div className="works-orbit">
        <div className="works-center glass">
          <p className="text-xs uppercase tracking-[0.3em] text-neon">Portfolio</p>
          <h2 className="mt-1 text-2xl font-bold">Our Work</h2>
        </div>

        {projects.map((project, index) => {
          const angle = (index / projects.length) * Math.PI * 2 - Math.PI / 2
          const left = 50 + Math.cos(angle) * 32
          const top = 50 + Math.sin(angle) * 34

          return (
            <button
              key={project.name}
              type="button"
              className="work-orbit-card glass rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon"
              style={{ left: `${left}%`, top: `${top}%` }}
              data-left={left}
              data-top={top}
              onClick={() => setActiveProject(activeProject?.name === project.name ? null : project)}
              aria-label={`View details for ${project.name}`}
              aria-pressed={activeProject?.name === project.name}
            >
              <span className="text-xs font-semibold">{project.name}</span>
              <span className="text-[0.65rem] text-soft">{project.category}</span>
            </button>
          )
        })}
      </div>

      {activeProject && (
        <div
          className="work-modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveProject(null)
          }}
        >
          <article className="work-modal glass" role="dialog" aria-modal="true" aria-labelledby="selected-project-title">
            <button
              ref={closeButton}
              type="button"
              onClick={() => setActiveProject(null)}
              className="ml-auto block rounded-full px-3 py-1 text-sm text-soft transition hover:text-neon focus-visible:outline-2 focus-visible:outline-neon"
              aria-label="Close project details"
            >
              Close
            </button>
            <p className="mt-4 text-xs uppercase tracking-widest text-neon">{activeProject.category}</p>
            <h3 id="selected-project-title" className="mt-2 text-2xl font-bold">{activeProject.name}</h3>
            {activeProject.contribution && <p className="mt-2 text-sm text-neon">{activeProject.contribution}</p>}
            <p className="mt-3 text-soft">{activeProject.text}</p>
            <p className="mt-3 text-sm text-soft">{activeProject.tech}</p>
            <div className="mt-5 flex gap-5 text-sm text-neon">
              {activeProject.live && <a href={activeProject.live} {...external}>Live Demo</a>}
              {activeProject.github && <a href={activeProject.github} {...external}>GitHub</a>}
            </div>
          </article>
        </div>
      )}
    </section>
  )
}

export default Works
