import { Zap, Users, Clock } from 'lucide-react'
import CrystalScene from '../components/three/CrystalScene'

const points = [
  { icon: Zap, title: 'Innovative Solutions', text: 'Technology meets creativity.' },
  { icon: Users, title: 'Client Focused', text: 'Your goals come first.' },
  { icon: Clock, title: 'On-Time Delivery', text: 'Your time matters.' },
]

function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="glass mx-auto grid max-w-7xl items-center gap-8 rounded-[3rem] p-8 md:p-12 lg:grid-cols-3">
        <div>
          <p className="text-neon">✦ About Us</p>
          <h2 className="mt-3 text-4xl font-bold">
            More than just a <span className="text-neon">design studio</span>
          </h2>
          <p className="mt-4 text-soft">
            Our mission is to make ideas feel alive. Our vision is a web worth exploring.
          </p>
        </div>

        <div aria-hidden="true" className="h-80">
          <CrystalScene />
        </div>

        <ul className="space-y-4">
          {points.map(({ icon: Icon, title, text }) => (
            <li key={title} className="glass flex items-center gap-4 rounded-2xl p-4">
              <Icon aria-hidden="true" className="shrink-0 text-neon" />
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="text-sm text-soft">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About