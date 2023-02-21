/* eslint-disable import/no-relative-packages */
import styles from './gameBoard.module.scss'
import { Card } from '../Card/Card.jsx'
import { useGameBoard } from './hooks/useGameBoard'

// Режимы: easy - 5 пар (10 карт); medium - 6 пар (12 карт); hard - 9 пар (18 карт)

export const GameBoard = () => {
  const {
    cards,
    countCard,
    openedCards,
    setOpenedCards,
  } = useGameBoard()

  return (
    <div className={`
    ${countCard === 12 && styles.containerMediumVersion}
    ${countCard < 12 && styles.containerEasyVersion}
    ${countCard > 12 && styles.containerHardVersion}`}
    >
      <div className={`
        ${countCard === 12 && styles.containerItemMediumVersion}
        ${countCard < 12 && styles.containerItemEasyVersion}
        ${countCard > 12 && styles.containerItemHardVersion}`}
      >
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
    </div>
  )
}
