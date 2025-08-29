import { useEffect, useRef, useState } from "react"
import cn from 'classnames'
// import classes from './styles.module.css'
import useStyles from './styles'

const Counter = () => {
  let [count, setCount] = useState(0)
  // const count = useRef(0)
  const classes = useStyles({ count })

  useEffect(() => {
    // console.log('Count changed:', count)
  }, [count])

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
        onClick={handleMinus}
        className={cn(classes.button, { [classes.disabledButton]: count === 0 })}
      >
        -
      </button>
      <span className={classes.count}>{count}</span>
      <button
        onClick={handlePlus}
        className={classes.button}
      >
        +
      </button>
    </div >
  )
}

export default Counter