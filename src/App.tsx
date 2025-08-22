import { use, useEffect, useRef } from 'react'
import FiltersBox from './components/FiltersBox'
import ProductsTable from './components/ProductsTable'
import Layout from './components/Layout'
import AlertButton from './components/AlertButton'
import './App.css'

const App = () => {
  const testRef = useRef<HTMLHeadingElement>(null)

  // useEffect(() => {
  //   if (!testRef.current) return

  //   testRef.current.scrollIntoView({ behavior: 'smooth' })
  // }, [])

  const handleClick = () => {
    // alert('Clicked!')
    if (!testRef.current) return

    testRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Layout>
      <br />
      <br />
      <br />
      <br />
      <AlertButton onClick={handleClick}>Click Me!</AlertButton>
      <FiltersBox />
      <ProductsTable />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2 ref={testRef}>Ref Test</h2>
      <br />
      <br />
      <br />
      <br />
    </Layout>
  )
}

export default App
