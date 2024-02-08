import { createSlice } from "@reduxjs/toolkit"

const initialMessage = ''

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: initialMessage,
    reducers: {
        createNotification(state, action) {
            const newNotification = action.payload
            return newNotification
        },
        deleteNotification(state, action) {
            const newNotification = ''
            return newNotification
        }
    }
})

export const { createNotification, deleteNotification } = notificationSlice.actions

export const handleNotification = (content) => {
    return async dispatch => {
    const [ message, timeToRender ] = content
      dispatch(createNotification(message))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, timeToRender)
    }
}

export default notificationSlice.reducer