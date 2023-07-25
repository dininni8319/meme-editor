import { configureStore } from '@reduxjs/toolkit'
import navReducer from './navbarSlice'

const store = configureStore({
  reducer: {
    nav: navReducer,
  },
})

export default store
