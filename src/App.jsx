import { MotionConfig } from 'motion/react'
import Navbar from './components/layout/Navbar'
import Hero from './sections/Hero'
import PortalReveal from './sections/PortalReveal'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <PortalReveal />
      </main>
    </MotionConfig>
  )
}

export default App