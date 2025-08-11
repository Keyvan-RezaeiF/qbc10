import { useState } from "react"

const Counter = () => {
  const [count, setCount] = useState(0)

  const handleMinus = () => {
    if (count === 0) return

    setCount(count - 1) // cause re-rendering
  }

  const handlePlus = () => {
    setCount(count + 1) // cause re-rendering
  }

  return (
    <div>
      <button
        style={{ width: 24, height: 24 }}
        onClick={handleMinus}
      >
        -
      </button>
      <span style={{ margin: '0 8px' }}>{count}</span>
      <button
        style={{ width: 24, height: 24 }}
        onClick={handlePlus}
      >
        +
      </button>
    </div>
  )
}

export default Counter