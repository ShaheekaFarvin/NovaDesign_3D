import { motion } from 'motion/react'

const labels = [
  { text: 'UI/UX Design', position: 'left-0 top-8', delay: 0 },
  { text: '3D Websites', position: 'right-0 top-1/3', delay: 1 },
  { text: 'Branding', position: 'bottom-8 left-8', delay: 2 },
]

function OrbPlaceholder() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-10 rounded-full bg-plasma/30 blur-3xl" />

      <motion.div
        aria-hidden="true"
        className="absolute inset-16 rounded-full bg-linear-to-br from-neon via-plasma to-night shadow-2xl shadow-neon/30"
        animate={{ y: [0, -16, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute inset-6 rounded-full border border-dashed border-neon/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {labels.map((label) => (
        <motion.span
          key={label.text}
          className={`absolute rounded-full border border-white/10 bg-surface/80 px-4 py-2 text-xs backdrop-blur-md ${label.position}`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, delay: label.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {label.text}
        </motion.span>
      ))}
    </div>
  )
}

export default OrbPlaceholder