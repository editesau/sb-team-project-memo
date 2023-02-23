/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import api from '../../../tools/Api/Api'

export const useGameBoard = () => {
  const [cards, setCards] = useState([])
  const [openedCards, setOpenedCards] = useState([])
  const countCard = cards.length // Число карт для нормальной равномерной отрисовки карт на доске

  const { gameId } = useParams()

  // Получает массив с картами
  const { isLoading, isFetching } = useQuery({
    queryKey: ['CARDS_QUERY_KEY'].concat(openedCards, gameId),
    queryFn: () => api.getCards(gameId)
      .then((res) => res.json()),
    onSuccess: (arrCards) => {
      setCards(arrCards)
    },
  })

  // Механизм совпадения/несовпадения карт
  useEffect(() => {
    if (openedCards.length === 2) {
      const [firstCard, secondCard] = openedCards

      // Если картинки совпадают, то isMatched - true
      if (firstCard.picture === secondCard.picture) {
        const openedCardsIds = openedCards.map((card) => card.id)
        api.matchCards(openedCardsIds)
      } else {
        // если картинки не совпали, то запрос на сервер и isOpen - false
      }

      // Очищает массив открытых карт - openedCards, если в массиве две карты
      setOpenedCards([])
    }
  }, [openedCards])

  return {
    gameId,
    cards,
    countCard,
    setCards,
    openedCards,
    setOpenedCards,
    isLoading,
    isFetching,
  }
}
