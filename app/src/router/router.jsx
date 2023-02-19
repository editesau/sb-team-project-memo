import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { SignIn } from '../components/SignIn/SignIn.jsx'
import { SignUp } from '../components/SignUp/SignUp.jsx'
import { GameMenu } from '../components/GameMenu/GameMenu.jsx'
import { GameBoard } from '../components/GameBoard/GameBoard.jsx'

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
        path: 'game',
        element: <GameBoard />,
      },
    ],
  },
])
