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
export default notificationSlice.reducer