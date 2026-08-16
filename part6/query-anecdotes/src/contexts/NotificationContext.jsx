import { createContext, useReducer, useContext, useRef } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const [, dispatch] = useContext(NotificationContext)
  return dispatch
}

export const useSetNotification = () => {
  const dispatch = useNotificationDispatch()
  const timeoutId = useRef(null)

  const setNotification = (message, seconds = 5) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }
    dispatch({ type: 'SET_NOTIFICATION', payload: message })
    timeoutId.current = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, seconds * 1000)
  }

  return setNotification
}

export default NotificationContext