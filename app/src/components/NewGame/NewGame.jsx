import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MemoButton } from '../../ui/MemoButton/MemoButton'
import { Modal } from '../Modal/Modal'
import styles from './newGame.module.scss'

export const NewGame = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const clickHandler = () => {
    setIsOpen(true)
  }

  const closeHandler = () => {
    setIsOpen(false)
  }

  const submitHandler = () => {
    // console.log(values)
    navigate('/game')
    closeHandler()
  }
  return (
    <div className={styles.wr}>
      <MemoButton text="Новая игра" clickHandler={clickHandler} />
      <Modal isOpen={isOpen} closeHandler={closeHandler}>
        <div className={styles.wr_start}>
          <h2>Выбрать уровень сложности</h2>
          <Formik
            initialValues={{
              level: '',
            }}
            onSubmit={submitHandler}
          >
            <Form className={styles.editForm}>
              <Field className={styles.select} name="level" placeholder="Выберете уровень сложности" as="select">
                <option disabled value="">Уровень сложности</option>
                <option value="10">Простой</option>
                <option value="12">Средний</option>
                <option value="14">Сложный</option>
              </Field>
              <ErrorMessage component="span" className={styles.error} name="level" />
              <MemoButton text="Начать игру" type="submit" />
            </Form>
          </Formik>
        </div>
      </Modal>
    </div>
  )
}
