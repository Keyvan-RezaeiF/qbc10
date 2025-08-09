import ProductCategory from "./ProductCategory"
import ProductRow from "./ProductRow"
import { fruits, vegetables } from "../constants/products"

const ProductsTable = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 8, marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 250 }}>
        <span>Name</span>
        <span>Price</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 4 }}>
        <ProductCategory title='Fruits' />
        {fruits.map(fruit => (
          <ProductRow
            title={fruit.title}
            price={fruit.price}
          />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 4 }}>
        <ProductCategory title='Vegetables' />
        {vegetables.map(vegetable => (
          <ProductRow
            title={vegetable.title}
            price={vegetable.price}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductsTable
