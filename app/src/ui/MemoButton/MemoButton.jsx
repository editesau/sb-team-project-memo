import styles from './MemoButton.module.scss'

export const MemoButton = (
  {
    text = 'Button',
    disabled = false,
    clickHandler = undefined,
  },
) => (
  <button
    type="button"
    className={styles.memoButton}
    onClick={clickHandler}
    disabled={disabled}
  >
    {text}
  </button>
)
