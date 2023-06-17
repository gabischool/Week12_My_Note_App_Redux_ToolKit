import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./api/NoteSlice";

const store = configureStore({
  reducer: {
    note: notesReducer,
  },
});

export default store;
