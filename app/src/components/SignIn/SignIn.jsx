import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { MemoButton } from '../../ui/MemoButton/MemoButton'
import styles from './signin.module.scss'
import { validationSchemaSignIn } from './validationSchema/validationSchema'
import { notifyError, notifySuccess } from '../../tools/toaster/toaster.js'
import api from '../../tools/Api/Api.js'
import fullLogo from '../../resources/images/logo/logo_full.png'

export const SignIn = () => {
  const navigate = useNavigate()
  const { mutate, isLoading } = useMutation({
    mutationFn: (signInData) => api.signIn(signInData),
    onSuccess: async (res) => {
      const { accessToken } = await res.json()
      api.setToken(accessToken)
      notifySuccess('Login successful')
      navigate('/menu')
    },
    onError: (res) => {
      notifyError(res.message)
    },
  })
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchemaSignIn}
      onSubmit={(data) => mutate(data)}
    >
      {(formik) => (
        <Form className={styles.container}>
          <img src={fullLogo} alt="Memorika logo" />
          <div className={styles.main}>
            <div className={styles.mainItem}>

              <div className={styles.textLabel}>
                <h1>Вход</h1>
              </div>

              <div className={styles.fieldContainer}>
                <Field type="email" name="email" className={styles.field} placeholder="Ваш email" autoComplete="off" />
                <ErrorMessage className={styles.errorMessage} component="span" name="email" />
              </div>

              <div className={styles.fieldContainer}>
                <Field type="password" name="password" className={styles.field} placeholder="Ваш пароль" autoComplete="off" />
                <ErrorMessage className={styles.errorMessage} component="span" name="password" />
              </div>

              <div className={styles.btnContainer}>
                <MemoButton text="Войти" type="submit" disabled={!(formik.isValid && formik.dirty) || isLoading} />
              </div>

              <div className={styles.redirectContainer}>
                <span className={styles.textRedirect}>Еще не зарегистрированы?</span>
                <Link to="/signup">Создать аккаунт</Link>
              </div>

            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
