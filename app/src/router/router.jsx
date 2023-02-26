import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { SignIn } from '../components/SignIn/SignIn.jsx'
import { SignUp } from '../components/SignUp/SignUp.jsx'
import { GameMenu } from '../components/GameMenu/GameMenu.jsx'
import { GameBoard } from '../components/GameBoard/GameBoard.jsx'
import { UserCabinet } from '../components/UserCabinet/UserCabinet.jsx'
import { ErrorScreen } from '../components/ErrorScreen/ErrorScreen.jsx'
import image404 from '../resources/images/errors/404.png'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'menu',
        element: <GameMenu />,
      },
      {
        path: 'game/:gameId',
        element: <GameBoard />,
      },
      {
        path: 'user',
        element: <UserCabinet />,
      },
      {
        path: '*',
        element: <ErrorScreen textError="Увы, такой страницы не существует." errorImages={image404} />,
      },
    ],
  },
])
