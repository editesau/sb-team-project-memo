/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MemoButton } from '../../ui/MemoButton/MemoButton'
import { Modal } from '../Modal/Modal'
import styles from './gameFinished.module.scss'

export const GameFinished = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const clickHandler = () => {
    setIsOpen(true)
  }

  const closeHandler = () => {
    setIsOpen(false)
  }

  const buttonHandler = () => {
    navigate('/menu')
    closeHandler()
  }

  return (
    <div className={styles.wr}>
      <div className={styles.link} onClick={clickHandler}>
        <Link onClick={clickHandler}> Game over </Link>
      </div>
      <Modal isOpen={isOpen} closeHandler={closeHandler}>
        <div className={styles.gameOver}>
          <h2>GAME OVER</h2>
          <MemoButton text="Начать сначала" />
          <MemoButton text="Выйти в меню" clickHandler={buttonHandler} />
        </div>
      </Modal>
    </div>
  )
}
