import Counter from "../Counter"
import classes from './styles.module.css'

interface ProductRowProps {
  title: string
  price: number
  description?: string
}

const ProductRow = (props: ProductRowProps) => {
  const {
    title = '',
    price = 0,
  } = props

  return (
    <div className={classes.row}>
      <span>{title}</span>
      <span>${price}</span>
      <Counter />
    </div>
  )
}

export default ProductRow