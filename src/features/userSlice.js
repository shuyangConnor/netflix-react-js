import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth, db } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { updateDoc, setDoc, doc, onSnapshot } from 'firebase/firestore'
import { saveShow } from './rowSlice'

const userLoggedIn = (state, action) => {
  state.userEmail = action.payload.userEmail
  state.signUpMessage = action.payload.message
}

export const signUp = createAsyncThunk('user/signUp', async (args) => {
  try {
    await createUserWithEmailAndPassword(auth, args.email, args.password)
    setDoc(doc(db, 'users', args.email), {
      savedShows: [],
    })
    return { successful: true, message: 'Sign up successful.' }
  } catch (error) {
    return { successful: false, message: error.message }
  }
})

export const logIn = createAsyncThunk('user/logIn', async (args, thunkAPI) => {
  try {
    await signInWithEmailAndPassword(auth, args.email, args.password)
    return { successful: true, message: 'Sign in successful.' }
  } catch (error) {
    return { successful: false, message: error.message }
  }
})

export const fetchUserMovies = createAsyncThunk(
  'user/fetchUserMovies',
  async (args, thunkAPI) => {
    try {
      const userEmail = thunkAPI.getState().user?.userEmail
      let savedShows = []
      console.log(userEmail)
      await new Promise((res, rej) => {
        onSnapshot(doc(db, 'users', userEmail), (doc) => {
          // console.log(doc.data()?.savedShows)
          savedShows = doc.data()?.savedShows
          res()
        })
      })
      return { successful: true, savedShows }
    } catch (error) {
      console.log(error)
      // throw { successful: false, savedShows: null }
    }
  }
)

export const logOut = createAsyncThunk('user/logOut', async () => {
  try {
    await signOut(auth)
    return { successful: true, message: 'Log out successful.' }
  } catch (error) {
    return { successful: false, message: error.message }
  }
})

const initialState = {
  userEmail: '',
  logInMessage: '',
  signUpMessage: '',
  savedShows: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetAllMessages: (state) => {
      state.logInMessage = ''
      state.signUpMessage = ''
    },
    deleteSavedShows: (state, { payload }) => {
      state.savedShows = state.savedShows.filter((el) => el.id !== payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        signUp.fulfilled,
        (state, { payload: { successful, message } }) => {
          if (successful) {
            state.userEmail = auth.currentUser.email
            state.signUpMessage = message
          } else {
            state.signUpMessage = message
          }
        }
      )
      .addCase(
        logIn.fulfilled,
        (state, { payload: { successful, message } }) => {
          if (successful) {
            state.userEmail = auth.currentUser.email
            state.logInMessage = message
          } else {
            state.logInMessage = message
          }
        }
      )
      .addCase(
        logOut.fulfilled,
        (state, { payload: { successful, message } }) => {
          console.log(successful)
          if (successful) {
            state.userEmail = null
          } else {
          }
        }
      )
      .addCase(
        fetchUserMovies.fulfilled,
        (state, { payload: { success, savedShows } }) => {
          console.log('ok')
          console.log(savedShows)
          state.savedShows = savedShows
        }
      )
      .addCase(
        saveShow.fulfilled,
        (state, { payload: { type, id, isUser, movie } }) => {
          let isIn = false
          state.savedShows.forEach((el) => {
            if (el.id === movie.id) {
              isIn = true
            }
          })
          if (isIn) {
            state.savedShows = state.savedShows.filter(
              (item) => item.id !== movie.id
            )
          }
          if (!isIn) {
            state.savedShows.push(movie)
          }
        }
      )
  },
})

export default userSlice.reducer
export const { resetAllMessages, deleteSavedShows } = userSlice.actions
