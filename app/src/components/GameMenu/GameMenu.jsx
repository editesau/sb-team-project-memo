import { Link } from 'react-router-dom'
import styles from './gameMenu.module.scss'

export const GameMenu = () => {
  const exitHandler = () => console.log('Exit')
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Link to="/game"> Play </Link>
        <Link to="/options"> Settings </Link>
        <span
          role="presentation"
          onClick={exitHandler}
        >
          {' '}
          Exit
          {' '}
        </span>
      </div>
    </div>
  )
}
