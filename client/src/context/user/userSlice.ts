import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define interface for user state
interface UserState {
  currentUser: {
    _id: string
    firstname: string
    lastname: string
    email: string
    role: string
    image: string | null
    password: string | null
  } | null
  error: string | null
  isPending: boolean
}

const initialState: UserState = {
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
    signInSuccess: (state, action: PayloadAction<UserState['currentUser']>) => {
      state.isPending = false
      state.currentUser = action.payload
      state.error = null
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.isPending = false
      state.error = action.payload
      state.currentUser = null
    },
    updateStart: (state) => {
      state.isPending = true
      state.error = null
    },
    updateSuccess: (state, action: PayloadAction<UserState['currentUser']>) => {
      state.isPending = false
      state.currentUser = action.payload
      state.error = null
    },
    updateFailure: (state, action: PayloadAction<string>) => {
      state.isPending = false
      state.error = action.payload
    },
    signOutSuccess: (state) => {
      state.currentUser = null
      state.error = null
      state.isPending = false
    }
  }
})

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  signOutSuccess
} = userSlice.actions

export default userSlice.reducer
