import classes from './styles.module.css'

interface AlertButtonProps {
  onClick: () => void
  children: React.ReactNode
}

const AlertButton = (props: AlertButtonProps) => {
  const { onClick, children } = props

  return (
    <button className='bg-red-500 text-white cursor-pointer' onClick={onClick}>
      {children}
    </button>
  )
}

export default AlertButton