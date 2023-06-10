import { configureStore } from '@reduxjs/toolkit'
import  noteslice from './api/noteslice'

export const store = configureStore({
  reducer: {
    notes: noteslice
  },
})
