import { useState } from "react"

const FiltersBox = () => {
  const [showSearchBox, setShowSearchBox] = useState(false)

  const handleClick = () => {
    setShowSearchBox(!showSearchBox)
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