/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-relative-packages */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import shirt from '../../resources/images/shirts/shirt_logo.png'
import { useGameStore } from '../../store/gameStore/useGameStore'
import api from '../../services/Api/Api'
import styles from './card.module.scss'
import { socketOpenCard } from '../../services/socketService/socketService.js'

export const Card = ({
  card, countCard,
}) => {
  const { gameId } = useParams()
  const [picture, setPicture] = useState('')
  const gameType = useGameStore((state) => state.gameType)
  const isBoardLocked = useGameStore((state) => state.isBoardLocked)
  const getCardStyle = () => {
    if (countCard > 12) return styles.imgHardVersion
    if (countCard < 12) return styles.imgEasyVersion
    return styles.imgMiddleVersion
  }

  // Получает и сохраняет картинку в стэйт picture
  useEffect(() => {
    async function getPicture() {
      if (card.isOpen || card.isMatched) {
        const imgGetResponse = await api.getImage(card.picture, gameType)
        const blob = await imgGetResponse.blob()
        const image = window.URL.createObjectURL(blob)
        return setPicture(image)
      }
      return null
    }
    getPicture()
  }, [card])

  const handlerCardClick = () => {
    socketOpenCard(gameId, card.id)
  }

  return (
    <div
      className={styles.containerImg}
      onClick={handlerCardClick}
      disabled={card.isOpen || card.isMatched || isBoardLocked}
    >
      <img
        className={getCardStyle()}
        src={(card.isOpen && picture) || (card.isMatched && picture) ? picture : shirt}
        alt="logo"
      />
    </div>
  )
}
