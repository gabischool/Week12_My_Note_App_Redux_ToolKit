
import { configureStore } from "@reduxjs/toolkit";
import Notesslice from "./api/Notesslice";

export const store = configureStore({
    reducer : {
        name : Notesslice
    }
})