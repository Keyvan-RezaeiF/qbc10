import classes from './styles.module.css'

interface AlertButtonProps {
  onClick: () => void
  children: React.ReactNode
  test?: string
}

const AlertButton = (props: AlertButtonProps) => {
  const { onClick, children, test } = props

  console.log('test', test)

  return (
    <button className='bg-red-500 text-white cursor-pointer' onClick={onClick}>
      {children}
    </button>
  )
}

export default AlertButton