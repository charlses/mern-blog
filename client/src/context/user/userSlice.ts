import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define interface for user state
interface UserState {
  currentUser: {
    firstname: string
    lastname: string
    email: string
    role: string // Adjust the type according to your data structure
    image: string | null // Adjust the type according to your data structure
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
    }
  }
})

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions

export default userSlice.reducer
