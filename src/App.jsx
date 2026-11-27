import { MotionConfig } from 'motion/react'
import Navbar from './components/layout/Navbar'
import Hero from './sections/Hero'
import PortalReveal from './sections/PortalReveal'
import About from './sections/About'
import Services from './sections/Services'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <PortalReveal />
        <About />
        <Services />
      </main>
    </MotionConfig>
  )
}

export default App