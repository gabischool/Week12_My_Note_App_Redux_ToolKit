import { configureStore } from "@reduxjs/toolkit";
import { NoteReducers } from "./NoteSlice";


export const store = configureStore({
    reducer:{
        note: NoteReducers
    }
})