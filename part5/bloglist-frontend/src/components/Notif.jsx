import { Alert } from '@mui/material'

const Notif = ({ type, message }) => {
  if (!message) return null

  return (
    <Alert severity={type} sx={{ marginTop: 1.25 }}>
      {message}
    </Alert>
  )
}

export const ErrorMessage = (props) => <Notif type="error" {...props} />
export const SuccessMessage = (props) => <Notif type="success" {...props} />