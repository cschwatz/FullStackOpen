import { createSlice } from "@reduxjs/toolkit"

const initialMessage = 'This is the notification'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: initialMessage,
    reducers: {
        createNotification(state, action) {
            return action
        }
    }
})

export default notificationSlice.reducer