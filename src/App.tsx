import FiltersBox from './components/FiltersBox'
import ProductsTable from './components/ProductsTable'
import './App.css'

const App = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
      <FiltersBox />
      <ProductsTable />
    </div>
  )
}

export default App
