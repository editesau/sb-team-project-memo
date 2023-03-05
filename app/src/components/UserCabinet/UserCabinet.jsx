import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/Api/Api.js'
import { notifyError } from '../../tools/toaster/toaster.js'
import { Loader } from '../Loader/Loader.jsx'
import styles from './userCabinet.module.scss'
import fullLogo from '../../resources/images/logo/logo_full.png'
import defaultAvatar from '../../resources/user/default_avatar.png'
import { MemoButton } from '../../ui/MemoButton/MemoButton.jsx'
import { UserCabinetModal } from '../UserCabinetModal/UserCabinetModal.jsx'

export const UserCabinet = () => {
  const [modalType, setModalType] = useState('password')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const editPasswordHandler = () => {
    setModalType('password')
    setIsModalOpen(true)
  }
  const editEmailHandler = () => {
    setModalType('email')
    setIsModalOpen(true)
  }
  const editAvatarHandler = () => {
    setModalType('avatar')
    setIsModalOpen(true)
  }

  const backToMenuHandler = () => {
    navigate('/menu')
  }
  const getUserInfoFn = async () => {
    const response = await api.getUserInfo()
    return response.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['USER_DATA'],
    queryFn: getUserInfoFn,
    onError: (error) => {
      notifyError(error.message)
    },
  })
  if (isLoading) return <Loader />
  return (
    <div className={styles.container}>
      <img src={fullLogo} alt="Memorika logo" />
      <div className={styles.main}>
        <div className={styles.mainItem}>
          <div className={styles.textLabel}>
            Личный кабинет
            {' '}
            {data.userData.userName}
          </div>
          <div className={styles.fieldContainer}>
            <img className={styles.userAvatar} src={data.userData.avatar || defaultAvatar} alt={`${data.userData.userName} avatar`} />
            <span className={styles.field}>
              ID:
              {' '}
              {data.userData._id}
            </span>
            <span className={styles.field}>
              e-mail:
              {' '}
              {data.userData.email}
            </span>
          </div>
          <div className={styles.btnContainer}>
            <MemoButton text="Сменить E-mail" clickHandler={editEmailHandler} type="button}" />
            <MemoButton text="Сменить пароль" clickHandler={editPasswordHandler} type="button}" />
            <MemoButton text="Сменить аватар" clickHandler={editAvatarHandler} type="button}" />
            <MemoButton text="В меню" clickHandler={backToMenuHandler} type="button" />
          </div>
        </div>
      </div>
      <UserCabinetModal type={modalType} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  )
}
