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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 250 }}>
      <span>{title}</span>
      <span>${price}</span>
    </div>
  )
}

export default ProductRow