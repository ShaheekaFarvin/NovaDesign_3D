import { motion } from 'motion/react'

function ServiceCard({ title, text, icon: Icon }) {
  return (
    <motion.article whileHover={{ y: -4 }} className="glass flex items-start gap-4 rounded-2xl p-5">
      <div className="shrink-0 rounded-xl border border-neon/40 p-2.5 text-neon">
        <Icon aria-hidden="true" size={20} />
      </div>
      <div>
        <h3 className="text-base font-bold">{title}</h3>
        <p className="mt-1 text-sm text-soft">{text}</p>
      </div>
    </motion.article>
  )
}

export default ServiceCard
