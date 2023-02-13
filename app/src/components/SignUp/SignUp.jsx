import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { notifyError, notifySuccess } from '../../tools/toaster/toaster'
import { MemoButton } from '../../ui/MemoButton/MemoButton'
import styles from './signup.module.scss'
import { validationSchemaSignUp } from './validationSchema/validationSchema'
import api from '../../tools/Api/Api.js'

export const SignUp = () => {
  const navigate = useNavigate()
  const { mutate, isLoading } = useMutation({
    mutationFn: (signUpData) => api.signUp(signUpData),
    onSuccess: () => {
      notifySuccess('Registration successful')
      navigate('/signin')
    },
    onError: (res) => {
      notifyError(res.message)
    },
  })

  return (
    <Formik
      initialValues={{ userName: '', email: '', password: '' }}
      validationSchema={validationSchemaSignUp}
      onSubmit={(data) => mutate(data)}
    >
      {(formik) => (
        <Form className={styles.container}>
          <div className={styles.main}>
            <div className={styles.mainItem}>

              <div className={styles.textLabel}>
                <h1>Sign up</h1>
              </div>

              <div className={styles.fieldContainer}>
                <Field type="text" name="userName" className={styles.field} placeholder="User name" autoComplete="off" />
              </div>

              <div className={styles.fieldContainer}>
                <Field type="email" name="email" className={styles.field} placeholder="Your Email" autoComplete="off" />
                <ErrorMessage className={styles.errorMessage} component="span" name="email" />
              </div>

              <div className={styles.fieldContainer}>
                <Field type="password" name="password" className={styles.field} placeholder="Your Password" autoComplete="off" />
                <ErrorMessage className={styles.errorMessage} component="span" name="password" />
              </div>

              <div className={styles.btnContainer}>
                <MemoButton text="Регистрация" type="submit" disabled={!(formik.isValid && formik.dirty) || isLoading} />
              </div>

            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
