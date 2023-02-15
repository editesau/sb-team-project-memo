/* eslint-disable jsx-a11y/no-static-element-interactions */
import styles from './card.module.scss'

export const Card = ({
  picture, card, handleCardClick, countCard,
}) => (
  <div
    className={styles.containerImg}
    onClick={() => handleCardClick(card)}
    onKeyDown={() => handleCardClick(card)}
    disabled={card.isOpen}
  >
    <img
      className={`
        ${countCard === 12 && styles.imgMiddleVersion}
        ${countCard < 12 && styles.imgEasyVersion}
        ${countCard > 12 && styles.imgHardVersion}
    `}
      src={picture}
      alt="logo"
    />
  </div>
)
