import { useEffect, useState } from 'react'
import { cardsFromBD } from '../cards'

export const useGameBoard = () => {
  const [cards, setCards] = useState([])
  const [openedCards, setOpenedCards] = useState([])
  const countCard = cards.length

  // На основе массива из БД, создает новый массив с картами, сортирует и добавляет еще два значения
  useEffect(() => {
    const newCards = [...cardsFromBD]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, isOpen: true, isMatched: false }))

    setCards(newCards)
  }, [])

  // При первом рендеринге держит карты открытими n-секунд, далее закрывает - isOpen: false
  useEffect(() => {
    const timer = setTimeout(() => {
      setCards((prevCards) => prevCards.map(((card) => ({ ...card, isOpen: false }))))
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Механизм совпадения/несовпадения карт
  useEffect(() => {
    if (openedCards.length === 2) {
      const [firstCard, secondCard] = openedCards

      // если id одинаковые, то isMatched - в true для обоих карт и они останутся открытыми
      if (firstCard.id === secondCard.id) {
        setCards(cards.map((card) => { //
          if (card.id === firstCard.id || card.id === secondCard.id) {
            return { ...card, isMatched: true }
          }
          return card
        }))

        // если id разные, то значение isOpen в false и карты перевернутся обратно
      } else {
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
    setTimeout(() => {
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
      }])
    }, 0)
  }

  return {
    cards,
    countCard,
    handleCardClick,
  }
}
