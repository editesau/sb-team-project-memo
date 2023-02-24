/* eslint-disable import/no-relative-packages */
import { Card } from '../Card/Card.jsx'
import { useGameBoard } from './hooks/useGameBoard'
import { GameFinished } from '../GameFinished/GameFinished.jsx'
import { Loader } from '../Loader/Loader.jsx'

// Режимы: easy - 5 пар (10 карт); medium - 6 пар (12 карт); hard - 9 пар (18 карт)

export const GameBoard = () => {
  const {
    cards,
    countCard,
    openedCards,
    setOpenedCards,
    isFinished,
    isLoading,
    setIsFinished,
    getContainerStyle,
    getContainerItemStyle,
  } = useGameBoard()
  if (isLoading) return <Loader />
  return (
    <div className={getContainerStyle()}>
      <div className={getContainerItemStyle()}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            countCard={countCard}
            openedCards={openedCards}
            setOpenedCards={setOpenedCards}
          />
        ))}
      </div>
      <GameFinished isOpen={isFinished} setIsOpen={setIsFinished} />
    </div>
  )
}
