/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useQuery } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../tools/Api/Api'
import { MemoButton } from '../../ui/MemoButton/MemoButton'
import { Loader } from '../Loader/Loader'
import { Modal } from '../Modal/Modal'
import styles from './newGame.module.scss'

export const NewGame = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const getGameTypesFunc = () => api.getGameTypes().then((res) => res.json())

  const {
    data, isLoading,
  } = useQuery({
    queryKey: ['gameType'],
    queryFn: getGameTypesFunc,
  })

  const clickHandler = () => {
    setIsOpen(true)
  }

  const closeHandler = () => {
    setIsOpen(false)
  }

  const submitHandler = (values) => {
    // здесь отправить запрос на бек
    console.log(values)
    navigate('/game')
    closeHandler()
  }

  if (isLoading) return <Loader />

  return (
    <div className={styles.wr}>
      <div className={styles.link} onClick={clickHandler}>
        <span onClick={clickHandler}> New Game </span>
      </div>
      <Modal isOpen={isOpen} closeHandler={closeHandler}>
        <div className={styles.wr_start}>
          <h2>Настройки игры</h2>
          <Formik
            initialValues={{
              level: '',
              types: '',
            }}
            validationSchema={Yup.object({
              level: Yup.string().required('Необходимо выбрать уровень сложности'),
              types: Yup.string().required('Необходимо выбрать тему'),
            })}
            onSubmit={(values) => submitHandler(values)}
          >
            <Form className={styles.editForm}>
              <Field className={styles.select} name="level" placeholder="Выберете уровень сложности" as="select">
                <option disabled value="">Уровень сложности</option>
                <option value="10">Простой</option>
                <option value="12">Средний</option>
                <option value="14">Сложный</option>
              </Field>
              <ErrorMessage component="span" className={styles.error} name="level" />
              <Field className={styles.select} name="types" placeholder="Выберете тему" as="select">
                <option disabled value="">Выбрать тему</option>
                {data.types.map((el, i) => <option key={i} value={el}>{el}</option>)}
              </Field>
              <ErrorMessage component="span" className={styles.error} name="types" />
              <MemoButton text="Начать игру" type="submit" />
            </Form>
          </Formik>
        </div>
      </Modal>
    </div>
  )
}
