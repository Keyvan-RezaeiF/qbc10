import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import withAuth from './hocs/withAuth'

const EnhancedApp = withAuth(App)

createRoot(document.getElementById('root')!).render(<EnhancedApp />)
