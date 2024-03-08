import { createSlice } from "@reduxjs/toolkit"
import loginService from '../services/login'

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    makeLogin(state, action) {
        return action.payload
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
  }
}

export default loginSlice.reducer