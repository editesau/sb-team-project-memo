import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { MemoButton } from '../../ui/MemoButton/MemoButton'
import styles from './signup.module.scss'
import { validationSchemaSignUp } from './validationSchema/validationSchema'

export const SignUp = () => (
  <Formik
    initialValues={{ userName: '', email: '', password: '' }}
    validationSchema={validationSchemaSignUp}
    onSubmit={(dataa) => console.log(dataa)}
  >
    {(formik) => (
      <Form className={styles.container}>
        <div className={styles.main}>
          <div className={styles.mainItem}>

            <div className={styles.textLabel}>
              <h1>Sign up</h1>
            </div>

            <div className={styles.fieldContainer}>
              <Field type="text" name="userName" className={styles.field} placeholder="UserSchema name" autoComplete="off" />
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
              <MemoButton text="Регистрация" type="submit" disabled={!(formik.isValid && formik.dirty)} />
            </div>

          </div>
        </div>
      </Form>
    )}
  </Formik>
)
