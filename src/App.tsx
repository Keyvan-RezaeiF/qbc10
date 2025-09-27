import { useState, useMemo } from 'react'
import Layout from './components/Layout'
import AlertButton from './components/AlertButton'
import './App.css'

type Item = {
  id: number
  isSelected: boolean
}

const initialItems = new Array(29_999_999).fill(0).map((_, index) => ({
  id: index,
  isSelected: index === 29_999_998,
}))

const App = () => {
  const [count, setCount] = useState<number>(0)
  const [items] = useState<Item[]>(initialItems)

  const selectedItem = useMemo(() => {
    console.log('Calculating selected item...')
    return items.find(item => item.isSelected)
  }, [items])

  return (
    <Layout>
      <h1>Counter: {count}</h1>
      <h1>Selected Item: {selectedItem?.id}</h1>
      <AlertButton onClick={() => setCount(count + 1)}>
        Increment
      </AlertButton>
    </Layout>
  )
}

export default App


// import { useMemo, useState } from 'react'
// import Layout from './components/Layout'
// import AlertButton from './components/AlertButton'
// import './App.css'

// const App = () => {
//   const [number, setNumber] = useState<number>(0)
//   const [dark, setDark] = useState<boolean>(false)
//   const themeStyles = {
//     backgroundColor: dark ? 'black' : 'white',
//     color: dark ? 'white' : 'black',
//   }

//   const doubleNumber = useMemo(() => slowFunction(number), [number])

//   return (
//     <Layout>
//       <input
//         type="number"
//         value={number}
//         onChange={e => setNumber(parseInt(e.target.value))}
//         className='text-center'
//       />
//       <AlertButton onClick={() => setDark(prev => !prev)}>
//         Change Theme
//       </AlertButton>
//       <div style={themeStyles}>{doubleNumber}</div>
//     </Layout>
//   )
// }

// const slowFunction = (number: number) => {
//   console.log('Calculating...')
//   for (let i = 0; i < 1000000000; i++) { }
//   return number * 2
// }

// export default App
