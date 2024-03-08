import { createSlice } from "@reduxjs/toolkit"
import userService from '../services/users'

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        fetchUsers(state, action) {
            return action.payload
        },
        makeUser(state, action) {
            // receives an user object as payload
            state.concat(action.payload)
        }
    }
})

export const { fetchUsers, makeUser } = userSlice.actions

export const getAllUsers = () => {
    return async dispatch => {
        const allUsers = await userService.getAll()
        dispatch(fetchUsers(allUsers))
    }
}

export const createNewUser = (userObject) => {
    return async dispatch => {
        const createdUser = await userService.create(userObject)
        dispatch(makeUser(createdUser))
    }
}

export default userSlice.reducer