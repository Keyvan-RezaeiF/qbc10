const FiltersBox = () => {
  return (
    <div>
      <input
        type="text"
        style={{
          display: 'block',
          marginBottom: 4,
        }}
        placeholder='Search ...'
      />
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