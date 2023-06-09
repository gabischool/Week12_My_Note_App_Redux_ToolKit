import { configureStore } from '@reduxjs/toolkit'
import NoteReducer from './api/NoteSlice';

export const store = configureStore({
    reducer: {
      note: NoteReducer
    },
  })