import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import requests from "../Requests"
import axios from "axios"

const initialState = {
  movies: [],
}

export const fetchMovies = createAsyncThunk('main/fetchMovies', async () => {
  try {
    const response = await axios.get(requests.requestPopular)
    return response.data
  } catch (err) {
    return err.message
  }
})

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {

    })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.results
      })
      .addCase(fetchMovies.rejected, (state) => {
        console.log("Rejected")
      })
  }
})

export default mainSlice.reducer