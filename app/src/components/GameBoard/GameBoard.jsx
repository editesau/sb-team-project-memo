/* eslint-disable import/no-relative-packages */
import shirt from '../../../../srv/resources/shirt/shirt_1.png'
import styles from './gameBoard.module.scss'
import { Card } from '../Card/Card.jsx'
import { useGameBoard } from './hooks/useGameBoard'

// Режимы: easy - 5 пар (10 карт); medium - 6 пар (12 карт); hard - 9 пар (18 карт)

export const GameBoard = () => {
  const {
    cards,
    countCard,
    handleCardClick,
  } = useGameBoard()

  return (
    <div className={countCard === 12 ? styles.containerMediumVersion : styles.container}>
      <div className={`
      ${countCard === 12 && styles.containerItemMediumVersion}
      ${countCard < 12 && styles.containerItemEasyVersion}
      ${countCard > 12 && styles.containerItemHardVersion}`}
      >
        {cards.map((card) => (
          <Card
            key={card.number}
            card={card}
            image={card.isOpen || card.isMatched ? card.logo : shirt}
            handleCardClick={handleCardClick}
          />
        ))}

      </div>
    </div>
  )
}
