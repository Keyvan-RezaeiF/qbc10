import { useRef, useState } from "react"

const useTime = (initialTime = 0) => {
  const [time, setTime] = useState<number>(initialTime)
  const intervalRef = useRef<number>(null)

  const handleStart = () => {
    if (intervalRef.current) return

    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)
  }

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    setTime(0)
  }

  return { time, handleStart, handleReset }
}

export default useTime