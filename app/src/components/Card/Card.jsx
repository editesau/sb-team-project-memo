/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-relative-packages */
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import shirt from '../../resources/images/shirts/shirt_logo.png'
import { useGameStore } from '../../store/gameStore/useGameStore'
import api from '../../tools/Api/Api'
import styles from './card.module.scss'

export const Card = ({
  card, countCard, openedCards, setOpenedCards,
}) => {
  const [picture, setPicture] = useState('')
  const { gameId } = useParams()
  const gameType = useGameStore((state) => state.gameType)
  const getCardStyle = () => {
    if (countCard > 12) return styles.imgHardVersion
    if (countCard < 12) return styles.imgEasyVersion
    return styles.imgMiddleVersion
  }
  // Переворачивает карту - isOpen - true и добавляет в массив открытых карт - openedCards
  const { mutate: openCard } = useMutation({
    mutationFn: async () => {
      const cardResponse = await api.openCard(gameId, card.id).json()
      return cardResponse
    },
    onSuccess: async (cardObj) => {
      setOpenedCards([...openedCards, {
        ...cardObj,
      }])
    },
  })

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
    if (card.isMatched || openedCards.length === 2) {
      return
    }
    openCard()
  }

  return (
    <div
      className={styles.containerImg}
      onClick={handlerCardClick}
      disabled={card.isOpen}
    >
      <img
        className={getCardStyle()}
        src={(card.isOpen && picture) || (card.isMatched && picture) ? picture : shirt}
        alt="logo"
      />
    </div>
  )
}
