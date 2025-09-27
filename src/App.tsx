import { useState, useCallback } from 'react'
import Layout from './components/Layout'
import AlertButton from './components/AlertButton'
import SearchBox from './components/SearchBox'
import './App.css'

const shiftUsers = (array: User[]) => {
  return array.slice(1).concat(array.slice(0, 1))
}

type User = {
  id: number
  name: string
}

const allUsers = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Jim' },
]

const App = () => {
  const [users, setUsers] = useState<User[]>(allUsers)

  const handleSearch = useCallback((text: string) => {
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
    setUsers(filteredUsers)
  }, [])

  console.log('re-render App')

  return (
    <Layout>
      <AlertButton onClick={() => setUsers(prev => shiftUsers(prev))}>
        Shuffle
      </AlertButton>
      <SearchBox onChange={handleSearch} />
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </Layout>
  )
}

export default App
