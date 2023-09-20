



import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    notes: [],
    status: "idle",
    error: null
};

export const fetchNotes = createAsyncThunk("note/fetchNotes", async () => {
    const response = await axios.get("http://localhost:9000/notes");
    return response.data;
});

export const addNote = createAsyncThunk("note/addNote", async (newNote) => {
    const response = await axios.post("http://localhost:9000/create_note", newNote);
    return response.data;
});

export const editNote = createAsyncThunk("note/editNote", async ({noteId, updateNote}) => {
    const response = await axios.put(`http://localhost:9000/update_note/${noteId}`, updateNote);
    return response.data;
});

export const deleteNote = createAsyncThunk("note/deleteNote", async (noteId) => {
    await axios.delete(`http://localhost:9000/delete_note/${noteId}`);
    return noteId;
});

export const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.status = "loading";
            state.error = null;
        }).addCase(fetchNotes.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.notes = action.payload;
        }).addCase(fetchNotes.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }).addCase(addNote.fulfilled, (state, action) => {
            state.notes.push(action.payload);
        }).addCase(editNote.fulfilled, (state, action) => {
            const {id, title, content} = action.payload;
            const existingNote = state.notes.find((note) => Number(note.id) === Number(id));
            if (existingNote) {
                existingNote.title = title;
                existingNote.content = content;
            }

        }).addCase(deleteNote.fulfilled, (state, action) => {
            const noteId = action.payload;
            state.notes = state.notes.filter((note) => note.id !== noteId);
        });
    }
});


export default noteSlice.reducer;