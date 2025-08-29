import ProductCategory from "../ProductCategory"
import ProductRow from "../ProductRow"
import { fruits, vegetables } from "../../constants/products"
import AlertButton from "../AlertButton"
import useTime from "../../hooks/useTime"
import classes from './styles.module.css'

const ProductsTable = () => {
  const { time, handleStart, handleReset } = useTime()

  return (
    <div className='flex items-center flex-col gap-2 mt-5'>
      <div className='flex items-center justify-between w-[250px]'>
        <span>Name</span>
        <span>Price</span>
      </div>
      <div className='product-category'>
        <ProductCategory title='Fruits' />
        {fruits.map(fruit => (
          <ProductRow
            title={fruit.title}
            price={fruit.price}
          />
        ))}
      </div>
      <div className='product-category'>
        <ProductCategory title='Vegetables' />
        {vegetables.map(vegetable => (
          <ProductRow
            title={vegetable.title}
            price={vegetable.price}
          />
        ))}
      </div>
      <span>{time}</span>
      <AlertButton onClick={handleStart}>Start</AlertButton>
      <AlertButton onClick={handleReset}>Reset</AlertButton>
    </div>
  )
}

export default ProductsTable
