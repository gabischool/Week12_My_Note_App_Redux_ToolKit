import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./api/NoteSlice";

export const store = configureStore({
    reducer: {
        note: noteReducer
    }

})
    

