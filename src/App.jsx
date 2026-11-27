import { MotionConfig } from 'motion/react'
import Navbar from './components/layout/Navbar'
import Hero from './sections/Hero'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
      </main>
    </MotionConfig>
  )
}

export default App