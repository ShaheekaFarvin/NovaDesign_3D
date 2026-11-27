import ServiceCard from '../components/ui/ServiceCard'
import { services } from '../data/services'

function Services() {
  return (
    <section id="services" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-4xl font-bold md:text-5xl">Our Services</h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services