import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { updateDoc, doc, arrayUnion } from "firebase/firestore"
import { db } from "../firebase"

const initialState = {
  upComingMovies: [],
  popularMovies: [],
  trendingMovies: [],
  topRatedMovies: [],
  horrorMovies: [],
}

export const fetchRowURL = createAsyncThunk("row/fetchRowURL", async (args) => {
  try {
    const response = await axios.get(args.url)
    response.data.results.map((item) => {
      item.liked = false
    })
    return { type: args.type, data: response.data }
  } catch (error) {
    return error.message
  }
})

export const saveShow = createAsyncThunk("row/saveShow", async ({ title, id, img, type }, thunkAPI) => {
  console.log("cool")
  try {
    const movieID = doc(db, 'users', `${thunkAPI.getState().user?.userEmail}`)
    if (thunkAPI.getState().user?.userEmail) {
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id,
          title,
          img
        })
      })
      return { type, id, isUser: true }
    } else {
      return { title, id, isUser: false }
    }
  } catch (error) {
    return error.message
  }
})

const rowSlice = createSlice({
  name: "row",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRowURL.pending, (state) => {
    }).addCase(fetchRowURL.fulfilled, (state, { payload: { type, data } }) => {
      switch (type) {
        case "Up Coming": {
          state.upComingMovies = data.results
          break
        }
        case "Popular": {
          state.popularMovies = data.results
          break
        }
        case "Trending": {
          state.trendingMovies = data.results
          break
        }
        case "Top Rated": {
          state.topRatedMovies = data.results
          break
        }
        case "Horror": {
          state.horrorMovies = data.results
          break
        }
      }
    }).addCase(fetchRowURL.rejected, (state) => {
      console.log("Row Rejected")
    }).addCase(saveShow.fulfilled, (state, { payload: { type, id, isUser } }) => {
      if (!isUser) {
        alert("Please log in to save shows.")
      } else {
        switch (type) {
          case "Up Coming": {
            state.upComingMovies.map(item => {
              if (item.id === id) item.liked = !item.liked
            })
            break
          }
          case "Popular": {
            state.popularMovies.map(item => {
              if (item.id === id) item.liked = !item.liked
            })
            break
          }
          case "Trending": {
            state.trendingMovies.map(item => {
              if (item.id === id) item.liked = !item.liked
            })
            break
          }
          case "Top Rated": {
            state.topRatedMovies.map(item => {
              if (item.id === id) item.liked = !item.liked
            })
            break
          }
          case "Horror": {
            state.horrorMovies.map(item => {
              if (item.id === id) item.liked = !item.liked
            })
            break
          }
        }
      }
    })
  }
})

export default rowSlice.reducer

export const { handleLiked } = rowSlice.actions