/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../../../tools/Api/Api'
import { useGameStore } from '../../../store/gameStore/useGameStore'

export const useGameBoard = () => {
  const [cards, setCards] = useState([])
  const [openedCards, setOpenedCards] = useState([])
  const countCard = cards.length

  const gameId = useGameStore((state) => state.gameId)
  console.log({ gameId })

  const { isLoading, isFetching } = useQuery({
    queryKey: ['CARDS_QUERY_KEY'].concat(openedCards, gameId),
    queryFn: () => api.getCards()
      .then((res) => res.json()),
    onSuccess: (arrCards) => {
      console.log('>>>>>>> Изменение useQuery')
      setCards(arrCards)
    },
  })

  // Механизм совпадения/несовпадения карт
  useEffect(() => {
    if (openedCards.length === 2) {
      const [firstCard, secondCard] = openedCards

      if (firstCard.picture === secondCard.picture) {
        console.log('>>>>>>>>>>  Совпадение')
        const openedCardsIds = openedCards.map((card) => card.id)
        api.matchCards(openedCardsIds)
      }

      // если массив открытых карт (openedCards) имеет две карты, то массив очищается
      setOpenedCards([])
    }
  }, [openedCards])

  return {
    cards,
    countCard,
    setCards,
    openedCards,
    setOpenedCards,
    isLoading,
    isFetching,
  }
}
