/* eslint-disable react/button-has-type */
import styles from './MemoButton.module.scss'

export const MemoButton = (
  {
    text = 'Button',
    disabled = false,
    clickHandler = undefined,
    type = 'button',
  },
) => (
  <button
    type={type}
    className={styles.memoButton}
    onClick={clickHandler}
    disabled={disabled}
  >
    {text}
  </button>
)
