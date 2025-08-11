import { useState } from "react"
import Button from "./Button"

interface StepsProps {
  messages: string[]
}

const Steps = (props: StepsProps) => {
  const { messages } = props
  const [step, setStep] = useState<number>(1)
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const handleNext = () => {
    if (step === messages.length) return

    setStep(prevState => prevState + 1)
    // setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step === 1) return

    setStep(prevState => prevState - 1)
    // setStep(step - 1)
  }

  const handleClose = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        className='close'
        onClick={handleClose}
      >
        &times;
      </button>
      {isOpen && (
        <div className='steps'>
          <div className="numbers">
            {messages.map((_, index) => (
              <div className={step >= index + 1 ? 'active' : ''}>
                {index + 1}
              </div>
            ))}
          </div>
          <p className='message'>
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <Button onClick={handlePrevious}>
              Previous
            </Button>
            <Button onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default Steps