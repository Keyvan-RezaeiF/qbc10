import FiltersBox from './components/FiltersBox'
import ProductsTable from './components/ProductsTable'
import Layout from './components/Layout'
import './App.css'

const App = () => {
  return (
    <Layout>
      <FiltersBox isSearchEnable={false} />
      <ProductsTable />
    </Layout>
  )
}

export default App
