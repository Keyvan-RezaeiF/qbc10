import FiltersBox from './components/FiltersBox'
import ProductsTable from './components/ProductsTable'
import Layout from './components/Layout'
import AlertButton from './components/AlertButton'
import './App.css'
import useTime from './hooks/useTime'

const App = () => {
  const { time, handleStart, handleReset } = useTime(20)

  return (
    <Layout>
      <span className='text-primary md:text-emerald-600 lg:text-error'>{time}</span>
      <AlertButton onClick={handleStart}>Start</AlertButton>
      <AlertButton onClick={handleReset}>Reset</AlertButton>
      <br />
      <br />
      <br />
      <FiltersBox />
      <ProductsTable />
    </Layout>
  )
}

export default App
