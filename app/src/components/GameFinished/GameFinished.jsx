/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useNavigate } from 'react-router-dom'
import { MemoButton } from '../../ui/MemoButton/MemoButton'
import { Modal } from '../Modal/Modal'
import styles from './gameFinished.module.scss'

export const GameFinished = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()

  const closeHandler = () => {
    setIsOpen(false)
    navigate('/menu')
  }

  const buttonHandler = () => {
    navigate('/menu')
    closeHandler()
  }

  return (
    <div className={styles.wr}>
      <Modal isOpen={isOpen} closeHandler={closeHandler}>
        <div className={styles.gameOver}>
          <h2>Все пары найдены</h2>
          <MemoButton text="Начать сначала" />
          <MemoButton text="Выйти в меню" clickHandler={buttonHandler} />
        </div>
      </Modal>
    </div>
  )
}
