import { configureStore } from '@reduxjs/toolkit'
import navReducer from './navbarSlice'
import resizeSlice from './resizeSlice'

const store = configureStore({
  reducer: {
    nav: navReducer,
    resize: resizeSlice
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
