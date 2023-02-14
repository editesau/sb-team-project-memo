import { ToastContainer } from 'react-toastify'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { GameMenu } from './components/GameMenu/GameMenu.jsx'
import { SignIn } from './components/SignIn/SignIn.jsx'
import { useUserStore } from './store/userStore/useUserStore.js'

const App = () => {
  const location = useLocation()
  const token = useUserStore((state) => state.accessToken)
  if (location.pathname === '/' && token) return <Navigate to="/menu" />
  if (location.pathname !== '/signin' && location.pathname !== '/signup' && !token) return <Navigate to="/signin" />
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default App
