import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import styles from './gameMenu.module.scss'
import { notifyError, notifySuccess } from '../../tools/toaster/toaster.js'
import api from '../../tools/Api/Api.js'
import { NewGame } from '../NewGame/NewGame'
import fullLogo from '../../resources/images/logo/logo_full.png'

export const GameMenu = () => {
  const navigate = useNavigate()

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

  return (
    <div className={styles.container}>
      <img src={fullLogo} alt="Memorika logo" />
      <div className={styles.main}>
        <NewGame />
        <Link to="/user"> Профиль </Link>
        <span
          role="presentation"
          onClick={logoutMutate}
        >
          {' '}
          Выход
          {' '}
        </span>
      </div>
    </div>
  )
}
