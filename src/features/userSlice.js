import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { auth } from "../firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"

export const signUp = createAsyncThunk("user/signUp", async (args) => {
  try {
    await createUserWithEmailAndPassword(auth, args.email, args.password)
    return { successful: true, message: "Sign up successful." }
  } catch (error) {
    return { successful: false, message: error.message }
  }
})

export const logIn = createAsyncThunk("user/logIn", async (args) => {
  try {
    await signInWithEmailAndPassword(auth, args.email, args.password)
    return { successful: true, message: "Sign in successful." }
  } catch (error) {
    return { successful: false, message: error.message }
  }
})

export const logOut = createAsyncThunk("user/logOut", async () => {
  try {
    await signOut(auth)
    return { successful: true, message: "Log out successful." }
  } catch (error) {
    return { successful: false, message: error.message }
  }
})

const initialState = {
  userEmail: "",
  logInMessage: "",
  signUpMessage: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetAllMessages: (state) => {
      state.logInMessage = ""
      state.signUpMessage = ""
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, { payload: { successful, message } }) => {
      if (successful) {
        state.userEmail = auth.currentUser.email
        state.signUpMessage = message
      }
      else {
        state.signUpMessage = message
      }
    }).addCase(logIn.fulfilled, (state, { payload: { successful, message } }) => {
      if (successful) {
        state.userEmail = auth.currentUser.email
        state.logInMessage = message
      }
      else {
        state.logInMessage = message
      }
    }).addCase(logOut.fulfilled, (state, { payload: { successful, message } }) => {
      console.log(successful)
      if (successful) {
        state.userEmail = null
      }
      else {

      }
    })
  }
})

export default userSlice.reducer
export const { resetAllMessages } = userSlice.actions 