import { createSlice } from "@reduxjs/toolkit"
import loginService from '../services/login'

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    makeLogin(state, action) {
        state = action.payload
        return state
    },
    makeLogout(state, action) {
        return null
    }
  }  
})

export const { makeLogin, makeLogout } = loginSlice.actions

export const attemptLogin = (user) => {
  return async dispatch => {
    const loggedUser = await loginService.login(user)
    dispatch(makeLogin(loggedUser))
    return loggedUser
  }
}

export default loginSlice.reducer