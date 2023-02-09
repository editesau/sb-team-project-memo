import { Link } from 'react-router-dom'
import styles from './menu.module.scss'

export const GameMenu = () => {
  function exitHandler() {
    console.log('Exit')
  }

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
