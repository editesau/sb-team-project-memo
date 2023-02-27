import { ToastContainer } from 'react-toastify'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getTokenFromLS } from './tools/helpers/helperFunctions.js'

const App = () => {
  const location = useLocation()
  const token = getTokenFromLS()
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
