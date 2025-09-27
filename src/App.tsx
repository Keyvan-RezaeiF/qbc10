import { useState, useCallback } from 'react'
import Layout from './components/Layout'
import AlertButton from './components/AlertButton'
import SearchBox from './components/SearchBox'
import withEnhancement from './hocs/withEnhancement'
import withWidth from './hocs/withWidth'
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

  const EnhancedAlertButton = withEnhancement(AlertButton)
  const EnhancedLayout = withWidth(Layout)

  return (
    <EnhancedLayout>
      <EnhancedAlertButton onClick={() => setUsers(prev => shiftUsers(prev))}>
        Shuffle
      </EnhancedAlertButton>
      <SearchBox onChange={handleSearch} />
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </EnhancedLayout>
  )
}

export default App
