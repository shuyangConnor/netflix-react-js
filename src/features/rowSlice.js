import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import requests from "../Requests"

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
    return { type: args.type, data: response.data }
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
          console.log(data.results)
          state.upComingMovies = data.results
          break
        }
        case "Popular": {
          console.log(data.results)
          state.popularMovies = data.results
          break
        }
        case "Trending": {
          console.log(data.results)
          state.trendingMovies = data.results
          break
        }
        case "Top Rated": {
          console.log(data.results)
          state.topRatedMovies = data.results
          break
        }
        case "Horror": {
          console.log(data.results)
          state.horrorMovies = data.results
          break
        }
      }
    }).addCase(fetchRowURL.rejected, (state) => {
      console.log("Row Rejected")
    })
  }
})

export default rowSlice.reducer