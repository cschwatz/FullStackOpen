import { createSlice } from "@reduxjs/toolkit"

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

export default loginSlice.reducer