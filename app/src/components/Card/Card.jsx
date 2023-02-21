/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-relative-packages */
import { QueryClient, useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import shirt from '../../../../srv/resources/shirt/shirt_1.png'
import api from '../../tools/Api/Api'
import styles from './card.module.scss'

const queryClient = new QueryClient()

export const Card = ({
  card, countCard, openedCards, setOpenedCards,
}) => {
  const [picture, setPicture] = useState('')

  // Переворачивает карту - isOpen - true и добавляет в массив открытых карт - openedCards
  const { mutate } = useMutation({
    mutationFn: async () => {
      const cardResponse = await api.turnCard(card.id).json()
      return cardResponse
    },
    onSuccess: async (cardObj) => {
      setOpenedCards([...openedCards, {
        ...cardObj,
      }])
      queryClient.invalidateQueries({ queryKey: ['CARDS_QUERY_KEY'] })
    },
  })

  // Получает и сохраняет картинку в стэйт picture
  useEffect(() => {
    async function getPicture() {
      if (card.isOpen) {
        const imgGetResponse = await api.getImage(card.picture, 'animals')
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
    mutate()
  }

  return (
    <div
      className={styles.containerImg}
      onClick={handlerCardClick}
      onKeyDown={handlerCardClick}
      disabled={card.isOpen}
    >
      <img
        className={`
        ${countCard === 12 && styles.imgMiddleVersion}
        ${countCard < 12 && styles.imgEasyVersion}
        ${countCard > 12 && styles.imgHardVersion}
    `}
        src={(card.isOpen && picture) || (card.isMatched && picture) ? picture : shirt}
        alt="logo"
      />
    </div>
  )
}
