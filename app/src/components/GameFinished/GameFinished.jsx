/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { MemoButton } from '../../ui/MemoButton/MemoButton'
import { Modal } from '../Modal/Modal'
import styles from './gameFinished.module.scss'
import api from '../../tools/Api/Api.js'

export const GameFinished = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()
  const { gameId } = useParams()
  const { mutate: resetGame } = useMutation({
    mutationFn: () => api.resetGame(gameId),
    onSuccess: () => {
      navigate(`/game/${gameId}`)
    },
  })
  const closeHandler = () => {
    setIsOpen(false)
    navigate('/menu')
  }

  const buttonHandler = () => {
    navigate('/menu')
    closeHandler()
  }

  const resetGameHandler = () => {
    resetGame()
    closeHandler()
  }

  return (
    <div className={styles.wr}>
      <Modal isOpen={isOpen} closeHandler={closeHandler}>
        <div className={styles.gameOver}>
          <h2>Все пары найдены</h2>
          <MemoButton text="Начать сначала" clickHandler={resetGameHandler} />
          <MemoButton text="Выйти в меню" clickHandler={buttonHandler} />
        </div>
      </Modal>
    </div>
  )
}
