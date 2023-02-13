import { ToastContainer } from 'react-toastify'
import { SignIn } from './components/SignIn/SignIn.jsx'
import { GameMenu } from './components/GameMenu/GameMenu.jsx'

const App = () => (
  <>
    <GameMenu />
    <ToastContainer />
  </>
)

export default App
