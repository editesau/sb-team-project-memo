/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import io from 'socket.io-client'
import api from '../../../services/Api/Api'
import styles from '../gameBoard.module.scss'

export const useGameBoard = () => {
  const navigate = useNavigate()
  const [cards, setCards] = useState([])
  const [isFinished, setIsFinished] = useState(false)
  const [openedCards, setOpenedCards] = useState([])
  const countCard = cards.length // Число карт для нормальной равномерной отрисовки карт на доске

  const { gameId } = useParams()

  const getCardsFn = async () => {
    const response = await api.getCards(gameId)
    return response.json()
  }
  // Получает массив с картами
  const { isLoading } = useQuery({
    queryKey: ['CARDS_QUERY_KEY'].concat(openedCards, gameId),
    queryFn: getCardsFn,
    onSuccess: (arrCards) => {
      setCards(arrCards)
      if (arrCards.every((card) => card.isMatched)) setIsFinished(true)
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
    if (cards.every((card) => card.isMatched) && cards.length !== 0) {
      setIsFinished(true)
    }
    if (openedCards.length === 2) {
      const [firstCard, secondCard] = openedCards

      // Если картинки совпадают, то isMatched - true
      if (firstCard.picture === secondCard.picture) {
        const openedCardsIds = openedCards.map((card) => card.id)
        matchCards(openedCardsIds)
      } else {
        closeCards(openedCards.map((card) => card.id))
        setTimeout(() => {
          setOpenedCards([])
        }, 1000)
      }
    }
  }, [openedCards])

  useEffect(() => {
    const socket = io('ws://127.0.0.1:5050')
    return () => {
      socket.disconnect()
    }
  }, [])
  const getContainerStyle = () => {
    if (countCard > 12) return styles.containerHardVersion
    if (countCard < 12) return styles.containerEasyVersion
    return styles.containerMediumVersion
  }

  const getContainerItemStyle = () => {
    if (countCard > 12) return styles.containerItemHardVersion
    if (countCard < 12) return styles.containerItemEasyVersion
    return styles.containerItemMediumVersion
  }

  const btnBackHandler = () => navigate('/menu')

  return {
    cards,
    countCard,
    openedCards,
    setOpenedCards,
    isLoading,
    isFinished,
    setIsFinished,
    getContainerStyle,
    getContainerItemStyle,
    btnBackHandler,
  }
}
