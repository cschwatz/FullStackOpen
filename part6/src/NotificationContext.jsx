import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      const newNotification = action.payload
      return newNotification
    case 'DELETE_NOTIFICATION':
      state = ''
      return state
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return(
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext