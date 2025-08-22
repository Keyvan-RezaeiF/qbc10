import { useRef, useState } from "react"

const Counter = () => {
  // let [count, setCount] = useState(0)
  const count = useRef(0)
  console.log(count.current)

  const handleMinus = () => {
    if (count.current === 0) return

    // setCount(count - 1) // cause re-rendering
    count.current = count.current - 1
  }

  const handlePlus = () => {
    // setCount(count + 1) // cause re-rendering
    count.current = count.current + 1
  }

  return (
    <div>
      <button
        style={{ width: 24, height: 24 }}
        onClick={handleMinus}
      >
        -
      </button>
      <span style={{ margin: '0 8px' }}>{count.current}</span>
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