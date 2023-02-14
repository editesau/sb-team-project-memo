import { useEffect, useState } from 'react'
import { cardsFromBD } from '../cards'

export const useGameBoard = () => {
  const [cards, setCards] = useState([])
  const [openedCards, setOpenedCards] = useState([])
  const countCard = cards.length

  useEffect(() => {
    const newCards = [...cardsFromBD]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, isOpen: false, isMatched: false }))

    setCards(newCards)
  }, [])

  useEffect(() => {
    if (openedCards.length === 2) {
      const [firstCard, secondCard] = openedCards

      if (firstCard.id === secondCard.id) { // если id одинаковые, то isMatched -
        setCards(cards.map((card) => { // - в true для обоих карт и они останутся открытыми
          if (card.id === firstCard.id || card.id === secondCard.id) {
            return { ...card, isMatched: true }
          }
          return card
        }))
      } else { // если id разные, то значение isOpen в false и карты перевернутся обратно
        setCards(cards.map((card) => {
          if (card.id === firstCard.id || card.id === secondCard.id) {
            return { ...card, isOpen: false }
          }
          return card
        }))
      }
      // если массив открытых карт (openedCards) имеет две карты, то массив очищается
      setOpenedCards([])
    }
  }, [openedCards])

  const handleCardClick = (card) => {
    if (card.isMatched || openedCards.length === 2) {
      return
    }

    setCards(
      cards.map((c) => {
        if (c.number === card.number && c.id === card.id) {
          return { ...c, isOpen: true }
        }
        return c
      }),
    )

    setOpenedCards([...openedCards, {
      ...card,
      isOpen: true,
    },
    ])
  }

  return {
    cards,
    countCard,
    handleCardClick,
  }
}
