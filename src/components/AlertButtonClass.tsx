import { Component } from 'react'

interface AlertButtonProps {
  onClick: () => void
  children: React.ReactNode
}

class AlertButtonClass extends Component<AlertButtonProps> {
  render() {
    const { onClick, children } = this.props

    return (
      <button onClick={onClick}>
        {children}
      </button>
    )
  }
}

export default AlertButtonClass