import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  isPending: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isPending = true
      state.error = null
    },
    signInSuccess: (state, action) => {
      state.isPending = false
      state.currentUser = action.payload
      state.error = null
    },
    signInFailure: (state, action) => {
      state.isPending = false
      state.error = action.payload
      state.currentUser = null
    }
  }
})

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions

export default userSlice.reducer
