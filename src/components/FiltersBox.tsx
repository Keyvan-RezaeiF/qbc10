interface FiltersBoxProps {
  isSearchEnable: boolean
}

const FiltersBox = (props: FiltersBoxProps) => {
  const { isSearchEnable = true } = props

  return (
    <div>
      {isSearchEnable ? (
        <input
          type="text"
          style={{
            display: 'block',
            marginBottom: 4,
          }}
          placeholder='Search ...'
        />
      ) : (
        <p style={{ marginBottom: 8 }}>
          Search feature is not enable now!
        </p>
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