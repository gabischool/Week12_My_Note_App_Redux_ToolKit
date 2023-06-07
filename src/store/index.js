
import { configureStore } from "@reduxjs/toolkit";
import { noteSlice } from "./api/NoteSlice"; 

export const store = configureStore({
  reducer: {
    note: noteSlice.reducer, 
  },
});

