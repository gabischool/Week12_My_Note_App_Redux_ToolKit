import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    notes: [],
    status: 'idle',
    error: null
}

// fetch notes 
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
    const response = await axios.get("http://localhost:9000/notes");
    return response.data
});

// add note 
export const addNote = createAsyncThunk("create_note/addNote", async (newNote) => {
    const response = await axios.post("http://localhost:9000/create_note", newNote);
    return response.data
});

// edit note
export const editNote = createAsyncThunk("notes/editNote", async ({noteId, updatedNote}) => {
    const response = await axios.put(`http://localhost:9000/update_note/${noteId}`, updatedNote);
    return response.data
});

// delete note 
export const deleteNote = createAsyncThunk("notes/deleteNote", async (noteId) => {
    await axios.delete(`http://localhost:9000/delete_note/${noteId}`)
    return noteId
});

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchNotes.fulfilled, (state, action) => {
            state.status = 'succeed';
            state.notes = action.payload
        })
        .addCase(fetchNotes.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(addNote.fulfilled, (state, action) => {
            state.notes.push(action.payload);
        })
        .addCase(editNote.fulfilled, (state, action) => {
            const {noteId, updatedNote} = action.payload;
            const existingNote = state.notes.find((note) => note.id === noteId);
            if(existingNote) {
                existingNote.title = updatedNote.title;
                existingNote.content = updatedNote.content;
            }
        })
        .addCase(deleteNote.fulfilled, (state, action) => {
            const noteId = action.payload;
            state.notes = state.notes.filter((note) => note.id !== noteId)
        })
    },
});

export default noteSlice.reducer;