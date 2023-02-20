/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import modalStyles from './modal.module.scss'

export const ModalContent = ({ children, closeHandler }) => {
  useEffect(() => {
    const listenerHandler = (e) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    }

    document.addEventListener('keydown', listenerHandler)

    return () => {
      document.removeEventListener('keydown', listenerHandler)
    }
  }, [closeHandler])

  return (
    <div className={modalStyles.modalContent}>
      <button
        type="button"
        className={modalStyles.closeBtn}
        onClick={closeHandler}
      >
        X
      </button>
      {children}
    </div>
  )
}

export const Modal = ({ closeHandler, isOpen = false, children }) => {
  if (!isOpen) return null

  const clickHandler = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,
    <div onClick={clickHandler} className={modalStyles.modalWr}>
      <ModalContent closeHandler={closeHandler}>{children}</ModalContent>
    </div>,
    document.getElementById('modal-root'),
  )
}
