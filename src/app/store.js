import { configureStore } from "@reduxjs/toolkit"
import navbarReducer from "../features/navbarSlice"
import mainReducer from "../features/mainSlice"
import rowReducer from "../features/rowSlice"

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    main: mainReducer,
    row: rowReducer,
  }
})