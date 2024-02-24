import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: '',
    reducers: {
        updateNotification(state, action) {
            const notificationContent = action.payload
            console.log(notificationContent)
            return notificationContent
        },
        deleteNotification(state, action) {
            state = ''
            return state
        }
    }
})

export const { updateNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer