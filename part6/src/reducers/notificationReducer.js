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
            const newNotification = action.payload
            return newNotification
        }
    }
})

export const setNotification = (content) => {
    return {
        type: 'notifications/createNotification',
        payload: content
    }
}

export const hideNotification = () => {
    return {
        type: 'notifications/deleteNotification',
        payload: ''
    }
}

export const { createNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer