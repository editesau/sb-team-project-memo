import * as Yup from 'yup'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../Modal/Modal.jsx'
import styles from './userCabinetModal.module.scss'
import api from '../../services/Api/Api.js'
import { MemoButton } from '../../ui/MemoButton/MemoButton.jsx'
import { notifySuccess } from '../../tools/toaster/toaster.js'

export const UserCabinetModal = ({ type, isOpen, setIsOpen }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: changePasswordMutation } = useMutation({
    mutationFn: (credentials) => api.changePassword(credentials),
    onSuccess: () => {
      notifySuccess('Пароль успешно изменен')
      api.clearToken()
      setIsOpen(false)
      navigate('/')
    },
  })
  const { mutate: changeEmailMutation } = useMutation({
    mutationFn: (email) => api.changeEmail(email),
    onSuccess: () => {
      notifySuccess('e-mail успешно изменен')
      setIsOpen(false)
      queryClient.invalidateQueries('USER_DATA')
    },
  })

  const { mutate: changeAvatarUrlMutation } = useMutation({
    mutationFn: (avatarUrl) => api.changeAvatar(avatarUrl),
    onSuccess: () => {
      notifySuccess('Аватар успешно изменен')
      setIsOpen(false)
      queryClient.invalidateQueries('USER_DATA')
    },
  })
  const submitHandler = (values) => {
    switch (type) {
      case 'password': {
        changePasswordMutation(values)
        break
      }
      case 'email': {
        changeEmailMutation(values)
        break
      }
      case 'avatar': {
        changeAvatarUrlMutation(values)
        break
      }
      default: break
    }
  }
  const getInitialValues = () => {
    switch (type) {
      case 'password': return { currentPassword: '', newPassword: '' }
      case 'email': return { email: '' }
      case 'avatar': return { avatarUrl: '' }
      default: return {}
    }
  }
  const getValidationSchema = () => {
    switch (type) {
      case 'password': return {
        newPassword: Yup.string()
          .min(6, 'Укажите минимум шесть символов')
          .required('Поле обязательное для заполнения'),
        currentPassword: Yup.string()
          .min(6, 'Укажите минимум шесть символов')
          .required('Поле обязательное для заполнения'),
      }
      case 'email': return { email: Yup.string().email('Некорректный адрес электронной почты').required('Поле обязательное для заполнения') }
      case 'avatar': return { avatarUrl: Yup.string().url().required() }
      default: return {}
    }
  }
  const getInput = () => {
    switch (type) {
      case 'password': return (
        <>
          <Field type="password" name="currentPassword" className={styles.field} placeholder="Ваш текущий пароль" autoComplete="off" />
          <ErrorMessage className={styles.errorMessage} component="span" name="currentPassword" />
          <Field type="password" name="newPassword" className={styles.field} placeholder="Ваш новый пароль" autoComplete="off" />
          <ErrorMessage className={styles.errorMessage} component="span" name="newPassword" />
        </>
      )
      case 'email': return (
        <>
          <Field type="email" name="email" className={styles.field} placeholder="Ваш новый email" autoComplete="off" />
          <ErrorMessage className={styles.errorMessage} component="span" name="email" />
        </>
      )
      case 'avatar': return (
        <>
          <Field type="url" name="avatarUrl" className={styles.field} placeholder="Ссылка на картинку" autoComplete="off" />
          <ErrorMessage className={styles.errorMessage} component="span" name="avatarUrl" />
        </>
      )
      default: return undefined
    }
  }
  const closeHandler = () => {
    setIsOpen(false)
  }
  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <h2>Редактирование профиля</h2>
      <Formik
        initialValues={getInitialValues()}
        validationSchema={Yup.object(getValidationSchema())}
        onSubmit={(values) => submitHandler(values)}
      >
        {(formik) => (
          <Form>
            <div className={styles.fieldContainer}>
              {getInput()}
            </div>
            <div className={styles.btnContainer}>
              <MemoButton text="Сохранить" type="submit" disabled={!(formik.isValid && formik.dirty)} />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
