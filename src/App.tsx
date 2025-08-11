import Steps from './components/Steps'
import { frontEndMessages, reactMessages } from './constants/messages'
import './App.css'

const App = () => {
  return (
    <>
      <Steps messages={reactMessages} />
      <Steps messages={frontEndMessages} />
    </>
  )
}

export default App
