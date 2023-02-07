import * as Yup from 'yup'

export const validationSchemaSignUp = Yup.object(
  {
    email: Yup.string().typeError('A number is required').email('Некорректный адрес электронной почты').required('Поле обязательное для заполнения'),
    password: Yup.string()
      .min(6, 'Укажите минимум шесть символов')
      .required('Поле обязательное для заполнения'),
  },
)
