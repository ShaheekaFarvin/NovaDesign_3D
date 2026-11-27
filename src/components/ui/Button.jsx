const variants = {
  primary:
    'bg-neon text-surface hover:shadow-lg hover:shadow-neon/30',
  outline: 'border border-neon/50 text-white hover:bg-neon/10',
}

function Button({ href, variant = 'primary', className = '', children, ...props }) {
  const Tag = href ? 'a' : 'button'
  const tagProps = href ? { href } : { type: 'button' }

  return (
    <Tag
      {...tagProps}
      {...props}
      className={`inline-flex items-center justify-center rounded-tl-2xl rounded-br-2xl px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon ${variants[variant]} ${className}`}
    >
      {children}
    </Tag>
  )
}

export default Button