import React, { FC } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

interface AlertProps {
  setShow: (show: boolean) => void
  show: boolean
  title: string
  body: string
}

export const Alert: FC<AlertProps> = ({ setShow, show, title, body }) => {
  return (
    <ToastContainer className="p-3" position="bottom-start">
      <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{body}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
