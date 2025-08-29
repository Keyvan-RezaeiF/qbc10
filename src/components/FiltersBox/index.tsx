import { useEffect, useRef, useState } from "react"
import classes from './styles.module.css'

const FiltersBox = () => {
  const [showSearchBox, setShowSearchBox] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) return

    inputRef.current?.focus()
  }, [])

  const handleClick = () => {
    setShowSearchBox(prev => !prev)
  }

  return (
    <div>
      <button onClick={handleClick}>Toggle Search Box</button>
      {showSearchBox && (
        <input
          type="text"
          className='block mb-1'
          ref={inputRef}
          placeholder='Search ...'
        />
      )}
      <div>
        <input
          type="checkbox"
          name="products"
          id="products"
          className='mr-1'
        />
        <label htmlFor="products">
          Only show products in stock
        </label>
      </div>
    </div>
  )
}

export default FiltersBox