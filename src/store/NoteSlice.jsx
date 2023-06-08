import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    notes: [],
    status: "idle",
    error: null
}

export const fetchNotes = createAsyncThunk('note/fetchNotes', async()=>{
    const response = await axios.get("http://localhost:9000/notes")
    return response.data;
})

export const addNote = createAsyncThunk('note/addNote', async(newNote)=>{
    const response = await axios.post("http://localhost:9000/create_note", newNote);
    return response.data
})

export const deleteNote = createAsyncThunk('note/deleteNote', async(id)=>{
     await axios.delete(`http://localhost:9000/delete_note/${id}`);
    return id;
})

export const updateNote = createAsyncThunk('note/updateNote', async({noteId, updatedNote})=>{
    const response = await axios.put(`http://localhost:9000/update_note/${noteId}`, updatedNote)
    return response.data;
})

export const NoteSlice = createSlice({
    name: "notes",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(fetchNotes.pending, (state, action)=>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchNotes.fulfilled, (state, action)=>{
            state.status = "success";
            state.notes = action.payload;
        })
        .addCase(fetchNotes.rejected, (state, action)=>{
            state.status = "rejected";
            state.error =  action.error.message;
        })
        .addCase(addNote.fulfilled, (state, action)=>{
            state.notes.push(action.payload);
        })
        .addCase(deleteNote.fulfilled, (state, action)=>{
            const noteId = action.payload
            state.notes = state.notes.filter(note => note.id !== action.payload);
            
        })
        .addCase(updateNote.fulfilled, (state, action)=>{
            const { noteId, updatedNote } = action.payload;
            const existingNote = state.notes.find(note => note.id === noteId);
            if(existingNote){
                existingNote.title = updatedNote.title;
                existingNote.content = updatedNote.content;
            }
        })
    },
})


export const NoteReducers = NoteSlice.reducer;