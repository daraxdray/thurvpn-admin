import { createSlice } from '@reduxjs/toolkit'

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    value: {},
  },
  reducers: {
    loginuser: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.loginCount += 1
    },
    logout: (state) => {
      state.value = null
      localStorage.removeItem('uid')
      localStorage.removeItem('utoken')
    },
    loginUserIn: (state, action) => {
      state.value = action.payload;
    },
  },
})
 
// Action creators are generated for each case reducer function
export const { loginUserIn, logout } = AuthSlice.actions

export default AuthSlice.reducer