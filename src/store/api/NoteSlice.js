import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notes from "../../components/Notes";
import axios from "axios";


const initialState = {
    notes: [],
     status: 'idle',
     error: null
 }


export const fetchNotes = createAsyncThunk('note/fetchNotes', async() => {
    const response = await axios.get("http://localhost:9000/notes");
    return response.data
})

export const createNote = createAsyncThunk("note/createNote", async (newNote) => {
    const response = await axios.post("http://localhost:9000/create_note", newNote);
    return response.data;
})

export const deleteNote = createAsyncThunk("note/deleteNote", async (noteId) => {
    await axios.delete(`http://localhost:9000/notes/${noteId}`);
    return noteId;
});


export const NoteSlice = createSlice({
    name: "note",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchNotes.pending, (state)=>{
            state.status = 'loading';
            state.error = null;
        })

        .addCase(fetchNotes.fulfilled, (state, action)=> {
            state.status = 'succeeded';
            state.notes = action.payload;
        })

        .addCase(fetchNotes.rejected, (state, action) => {
         state.status = 'failed';
         state.error = action.error.message;
        }).addCase( createNote.fulfilled, (state, action) => {
            state.notes.push(action.payload);
        })
        .addCase(deleteNote.fulfilled, (state, action) => {
            const noteId = action.payload;
            state.notes = state.notes.filter((note) => note.id !== noteId);
        });
        
    }
});



export default NoteSlice.reducer;