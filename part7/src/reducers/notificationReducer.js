import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: '',
    reducers: {
        updateNotification(state, action) {
            const notification = action.payload
            return notification
        },
        deleteNotification(state, action) {
            return ''
        }
    }
})

export const { updateNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer