import { createSlice } from "@reduxjs/toolkit"
import userService from '../services/users'

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        fetchUsers(state, action) {
            return action.payload
        }
    }
})

export const { fetchUsers } = userSlice.actions

export const getAllUsers = () => {
    return async dispatch => {
        const allUsers = await userService.getAll()
        dispatch(fetchUsers(allUsers))
    }
}

export default userSlice.reducer