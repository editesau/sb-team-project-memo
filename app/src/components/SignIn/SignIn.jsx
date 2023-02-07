import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { Link } from 'react-router-dom'
import { MemoButton } from '../../ui/MemoButton/MemoButton'
import styles from './signin.module.scss'
import { validationSchemaSignIn } from './validationSchema/validationSchema'

export const SignIn = () => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={validationSchemaSignIn}
    onSubmit={(data) => console.log(data)}
  >
    {(formik) => (
      <Form className={styles.container}>
        <div className={styles.main}>
          <div className={styles.mainItem}>

            <div className={styles.textLabel}>
              <h1>Sign In</h1>
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
              <MemoButton text="Авторизация" type="submit" disabled={!(formik.isValid && formik.dirty)} />
            </div>

            <div className={styles.redirectContainer}>
              <span className={styles.textRedirect}>New to Memo?</span>
              <Link to="/signUp">Create an account</Link>
            </div>

          </div>
        </div>
      </Form>
    )}
  </Formik>
)
