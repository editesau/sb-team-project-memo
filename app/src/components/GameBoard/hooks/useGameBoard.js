/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from '../gameBoard.module.scss'
import { closeSocket, initializeSocket, socketGetGame } from '../../../services/socketService/socketService.js'
import { useGameStore } from '../../../store/gameStore/useGameStore.js'

export const useGameBoard = () => {
  const navigate = useNavigate()
  const { gameId } = useParams()
  const [isFinished, setIsFinished] = useState(false)
  const cards = useGameStore((state) => state.cards)
  const setGameCards = useGameStore((state) => state.setGameCards)
  const setGameType = useGameStore((state) => state.setGameType)
  const updateCard = useGameStore((state) => state.updateCard)
  const mismatchCards = useGameStore((state) => state.mismatchCards)
  const matchCards = useGameStore((state) => state.matchCards)
  const setIsBoardLocked = useGameStore((state) => state.setIsBoardLocked)

  const countCard = cards.length // Число карт для нормальной равномерной отрисовки карт на доске

  useEffect(() => {
    initializeSocket(setGameCards, setGameType, updateCard, mismatchCards, matchCards, setIsBoardLocked, setIsFinished)
    socketGetGame(gameId)

    return () => {
      closeSocket()
      setGameCards([])
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
    isFinished,
    setIsFinished,
    getContainerStyle,
    getContainerItemStyle,
    btnBackHandler,
  }
}
