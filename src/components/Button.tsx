interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  backgroundColor?: string
  color?: string
}

const Button = (props: ButtonProps) => {
  const {
    onClick,
    children,
    backgroundColor = '#7950f2',
    color = '#fff'
  } = props

  return (
    <button
      style={{ backgroundColor, color }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button