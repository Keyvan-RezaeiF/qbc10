interface AlertButtonProps {
  onClick: () => void
  children: React.ReactNode
}

const AlertButton = (props: AlertButtonProps) => {
  const { onClick, children } = props

  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

export default AlertButton