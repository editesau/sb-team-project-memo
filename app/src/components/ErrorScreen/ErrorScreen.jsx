import styles from './errorScreen.module.scss'

export const ErrorScreen = ({ textError, errorImages }) => (
  <div className="container">
    <div className={`${styles.main}`}>

      <div className="text-center">
        <h3 className={styles.caption}>Oops! Что-то пошло не так!</h3>
      </div>

      <div className={styles.container}>
        <p className={styles.textError}>
          {textError}
        </p>

        <div>
          <img className={styles.img} src={errorImages} alt="logo error" />
        </div>
      </div>

    </div>
  </div>
)
