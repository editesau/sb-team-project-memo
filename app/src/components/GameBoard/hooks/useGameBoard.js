/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import api from '../../../tools/Api/Api'

export const useGameBoard = () => {
  const [cards, setCards] = useState([])
  const [openedCards, setOpenedCards] = useState([])
  const countCard = cards.length // Число карт для нормальной равномерной отрисовки карт на доске

  const { gameId } = useParams()
  const queryClient = useQueryClient()
  // Получает массив с картами
  const { isLoading, isFetching } = useQuery({
    queryKey: ['CARDS_QUERY_KEY'].concat(openedCards, gameId),
    queryFn: () => api.getCards(gameId)
      .then((res) => res.json()),
    onSuccess: (arrCards) => {
      setCards(arrCards)
    },
  })

  const { mutate: matchCards } = useMutation({
    mutationFn: (cardIds) => api.matchCards(gameId, cardIds),
    onSuccess: () => {
      setOpenedCards([])
    },
  })

  const { mutate: closeCards } = useMutation({
    mutationFn: (cardIds) => api.closeCards(gameId, cardIds),
  })

  // Механизм совпадения/несовпадения карт
  useEffect(() => {
    if (openedCards.length === 2) {
      const [firstCard, secondCard] = openedCards

      // Если картинки совпадают, то isMatched - true
      if (firstCard.picture === secondCard.picture) {
        const openedCardsIds = openedCards.map((card) => card.id)
        matchCards(openedCardsIds)
      } else {
        closeCards(openedCards.map((card) => card.id))
      }
      setTimeout(() => {
        setOpenedCards([])
      }, 1000)
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
