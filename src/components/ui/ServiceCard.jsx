import { motion } from 'motion/react'

function ServiceCard({ title, text, icon: Icon }) {
  return (
    <motion.article
      whileHover={{ y: -10, scale: 1.02 }}
      className="group rounded-3xl border border-white/10 bg-surface/70 p-8 transition-colors hover:border-neon/50"
    >
      <div className="inline-flex rounded-2xl bg-neon/10 p-4 text-neon transition group-hover:rotate-6 group-hover:bg-neon group-hover:text-night">
        <Icon aria-hidden="true" />
      </div>
      <h3 className="mt-6 text-xl font-bold">{title}</h3>
      <p className="mt-3 text-soft">{text}</p>
    </motion.article>
  )
}

export default ServiceCard