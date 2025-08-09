interface ProductCategoryProps {
  title: string
}

const ProductCategory = (props: ProductCategoryProps) => {
  const { title = '' } = props

  return (
    <span>{title}</span>
  )
}

export default ProductCategory