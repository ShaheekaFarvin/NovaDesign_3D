import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
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
        gsap.from('.work-card', {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="projects" ref={root} className="works-section">
      <div className="works-content">
        <header className="works-heading">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-neon">Portfolio · Selected projects</p>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">Our Work</h2>
          </div>
          <p className="max-w-md leading-relaxed text-soft">
            A collection of ideas shaped into useful digital experiences. Choose a project to see what went into it.
          </p>
        </header>

        <div className="works-grid">
          {projects.map((project, index) => (
            <button
              key={project.name}
              type="button"
              className="work-card"
              onClick={() => setActiveProject(project)}
              aria-label={`View details for ${project.name}`}
              aria-pressed={activeProject?.name === project.name}
            >
              <span className="work-card-header">
                <span className="work-card-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="work-card-category">{project.category}</span>
                <span className="work-card-mark"><ArrowUpRight size={19} /></span>
              </span>

              <span className="work-card-body">
                <span className="work-card-title">{project.name}</span>
                <span className="work-card-description">{project.text}</span>
                <span className="work-card-footer">
                  <span className="work-card-tech">{project.tech}</span>
                  <span className="work-card-action">View details <ArrowUpRight size={15} /></span>
                </span>
              </span>
            </button>
          ))}
        </div>
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
