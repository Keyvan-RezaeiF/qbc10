import { useEffect, useRef, useState } from "react"

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
          style={{
            display: 'block',
            marginBottom: 4,
          }}
          ref={inputRef}
          placeholder='Search ...'
        />
      )}
      <div>
        <input
          type="checkbox"
          name="products"
          id="products"
          style={{ marginRight: 4 }}
        />
        <label htmlFor="products">
          Only show products in stock
        </label>
      </div>
    </div>
  )
}

export default FiltersBox