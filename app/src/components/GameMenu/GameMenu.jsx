import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import styles from './gameMenu.module.scss'
import { notifyError, notifySuccess } from '../../tools/toaster/toaster.js'
import api from '../../tools/Api/Api.js'
import { NewGame } from '../NewGame/NewGame'
import { useGameStore } from '../../store/gameStore/useGameStore'

export const GameMenu = () => {
  const navigate = useNavigate()
  const addGameId = useGameStore((state) => state.addGameId)

  const { mutate: logoutMutate } = useMutation({
    mutationFn: api.signOut,
    onSuccess: () => {
      api.clearToken()
      notifySuccess('Logout successful')
      navigate('/signin')
    },
    onError: (res) => {
      if (res.response.status === 401) {
        api.clearToken()
        notifyError('Your session was expired, please sign in again.')
        navigate('/signin')
      } else {
        notifyError(res.message)
      }
    },
  })

  const { mutate: startGame } = useMutation({
    mutationFn: api.getGameId,
    onSuccess: async (response) => {
      const data = await response.json()
      addGameId(data)
      localStorage.setItem('gameId', JSON.stringify(data.gameId))
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <NewGame />
        <Link to="/game" onClick={startGame}> Play </Link>
        <Link to="/options"> Settings </Link>
        <span
          role="presentation"
          onClick={logoutMutate}
        >
          {' '}
          Exit
          {' '}
        </span>
      </div>
    </div>
  )
}
