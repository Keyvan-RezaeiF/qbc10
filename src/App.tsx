import FiltersBox from './components/FiltersBox'
import ProductsTable from './components/ProductsTable'
import Layout from './components/Layout'
import AlertButton from './components/AlertButton'
import './App.css'

const App = () => {
  const handleClick = () => {
    alert('Clicked!')
  }

  return (
    <Layout>
      <AlertButton onClick={handleClick}>Click Me!</AlertButton>
      <FiltersBox />
      <ProductsTable />
    </Layout>
  )
}

export default App
