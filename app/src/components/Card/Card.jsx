/* eslint-disable jsx-a11y/no-static-element-interactions */
import styles from './card.module.scss'

export const Card = ({
  image, card, handleCardClick,
}) => (
  <div
    className={styles.containerImg}
    onClick={() => handleCardClick(card)}
    onKeyDown={() => handleCardClick(card)}
    disabled={card.isOpen}
  >
    <img className={styles.img} src={image} alt="logo" />
  </div>
)
