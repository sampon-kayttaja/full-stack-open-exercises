const Notif = ({ type, message }) => {
  if (message === null) return null

  return (
    <div className={type}>
      {message}
    </div>
  )
}

export const ErrorMessage = (props) => <Notif type="error" {...props} />
export const SuccessMessage = (props) => <Notif type="success" {...props} />