import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { updateDoc, doc, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase'
import { fetchUserMovies } from './userSlice'

const initialState = {
  upComingMovies: [],
  popularMovies: [],
  trendingMovies: [],
  topRatedMovies: [],
  horrorMovies: [],
}

export const fetchRowURL = createAsyncThunk(
  'row/fetchRowURL',
  async (args, thunkAPI) => {
    try {
      const response = await axios.get(args.url)
      if (thunkAPI.getState().row?.horrorMovies.length > 0) {
        return { type: args.type, data: response.data, change: false }
      }
      response.data.results.map((item) => {
        item.liked = false
      })
      return { type: args.type, data: response.data, change: true }
    } catch (error) {
      return error.message
    }
  }
)

export const saveShow = createAsyncThunk(
  'row/saveShow',
  async ({ title, id, img, type, liked }, thunkAPI) => {
    try {
      console.log(thunkAPI.getState().user?.userEmail)
      const movieID = doc(db, 'users', `${thunkAPI.getState().user?.userEmail}`)
      if (thunkAPI.getState().user?.userEmail) {
        if (!liked) {
          await updateDoc(movieID, {
            savedShows: arrayUnion({
              id,
              title,
              img,
            }),
          })
        } else {
          const movieRef = doc(
            db,
            'users',
            `${thunkAPI.getState().user?.userEmail}`
          )
          const result = thunkAPI
            .getState()
            .user?.savedShows.filter((item) => item.id !== id)
          await updateDoc(movieRef, {
            savedShows: result,
          })
        }

        return { type, id, isUser: true, movie: { id, title, img } }
      } else {
        return { title, id, isUser: false }
      }
    } catch (error) {
      console.log(error)
      throw error.message
    }
  }
)

const rowSlice = createSlice({
  name: 'row',
  initialState,
  reducers: {
    emptyLiked: (state) => {
      state.upComingMovies.forEach((element) => {
        element.liked = false
      })
      state.popularMovies.forEach((element) => {
        element.liked = false
      })
      state.trendingMovies.forEach((element) => {
        element.liked = false
      })
      state.topRatedMovies.forEach((element) => {
        element.liked = false
      })
      state.horrorMovies.forEach((element) => {
        element.liked = false
      })
    },
    removeLiked: (state, { payload }) => {
      console.log(payload)
      state.upComingMovies = state.upComingMovies.map((element) => {
        if (element.id !== payload) {
          return element
        } else {
          element.liked = !element.liked
          return element
        }
      })
      state.popularMovies.map((element) => {
        if (element.id !== payload) {
          return element
        } else {
          element.liked = !element.liked
          return element
        }
      })
      state.trendingMovies.map((element) => {
        if (element.id !== payload) {
          return element
        } else {
          element.liked = !element.liked
          return element
        }
      })
      state.topRatedMovies.map((element) => {
        if (element.id !== payload) {
          return element
        } else {
          element.liked = !element.liked
          return element
        }
      })
      state.horrorMovies.map((element) => {
        if (element.id !== payload) {
          return element
        } else {
          element.liked = !element.liked
          return element
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRowURL.pending, (state) => {})
      .addCase(
        fetchRowURL.fulfilled,
        (state, { payload: { type, data, change } }) => {
          if (!change) {
            return
          }
          switch (type) {
            case 'Up Coming': {
              state.upComingMovies = data.results
              break
            }
            case 'Popular': {
              state.popularMovies = data.results
              break
            }
            case 'Trending': {
              state.trendingMovies = data.results
              break
            }
            case 'Top Rated': {
              state.topRatedMovies = data.results
              break
            }
            case 'Horror': {
              state.horrorMovies = data.results
              break
            }
          }
        }
      )
      .addCase(fetchRowURL.rejected, (state) => {
        console.log('Row Rejected')
      })
      .addCase(
        fetchUserMovies.fulfilled,
        (state, { payload: { successful, savedShows } }) => {
          state.upComingMovies.forEach((element) => {
            for (const savedShow of savedShows) {
              if (savedShow.id === element.id) {
                element.liked = true
              }
            }
          })
          state.popularMovies.forEach((element) => {
            for (const savedShow of savedShows) {
              if (savedShow.id === element.id) {
                element.liked = true
              }
            }
          })
          state.trendingMovies.forEach((element) => {
            for (const savedShow of savedShows) {
              if (savedShow.id === element.id) {
                element.liked = true
              }
            }
          })
          state.topRatedMovies.forEach((element) => {
            for (const savedShow of savedShows) {
              if (savedShow.id === element.id) {
                element.liked = true
              }
            }
          })
          state.horrorMovies.forEach((element) => {
            for (const savedShow of savedShows) {
              if (savedShow.id === element.id) {
                element.liked = true
              }
            }
          })
        }
      )
      .addCase(
        saveShow.fulfilled,
        (state, { payload: { type, id, isUser, movie } }) => {
          console.log(type)
          if (!isUser) {
            alert('Please log in to save shows.')
          } else {
            switch (type) {
              case 'Up Coming': {
                state.upComingMovies.map((item) => {
                  if (item.id === id) item.liked = !item.liked
                })
                break
              }
              case 'Popular': {
                state.popularMovies.map((item) => {
                  if (item.id === id) item.liked = !item.liked
                })
                break
              }
              case 'Trending': {
                state.trendingMovies.map((item) => {
                  if (item.id === id) item.liked = !item.liked
                })
                break
              }
              case 'Top Rated': {
                state.topRatedMovies.map((item) => {
                  if (item.id === id) item.liked = !item.liked
                })
                break
              }
              case 'Horror': {
                state.horrorMovies.map((item) => {
                  if (item.id === id) item.liked = !item.liked
                })
                break
              }
            }
          }
        }
      )
      .addCase(saveShow.rejected, (state, payload) => {
        console.log('Failed')
      })
  },
})

export default rowSlice.reducer
export const { emptyLiked, removeLiked } = rowSlice.actions
