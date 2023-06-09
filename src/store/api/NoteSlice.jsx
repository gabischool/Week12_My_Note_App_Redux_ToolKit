import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNote = createAsyncThunk("notes/fetchNote", async () => {
    const response = await axios.get("http://localhost:9000/notes");
    return response.data
});
export const addNote = createAsyncThunk("notes/addNote", async (values) => {
    const response = await axios.post("http://localhost:9000/create_note", values);
    return response.data;
})
export const deleteNote = createAsyncThunk("note/deleteNote", async (noteId) => {
    await axios.delete(`http://localhost:9000/delete_note/${noteId}`);
    return noteId;
})
export const updateNote = createAsyncThunk("note/updateNote", async ({ id, values }) => {
    const response = await axios.put(`http://localhost:9000/update_note/${id}`, values);
    return response.data;
});
const initialState = {
    notes: [],
    status: "idle",
    error: null
}
const NoteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNote.pending, (state) => {
                state.status = "Loading";
                state.error = null;
            })
            .addCase(fetchNote.fulfilled, (state, action) => {
                state.status = "Success";
                state.notes = action.payload;
                state.error = null;
            })
            .addCase(fetchNote.rejected, (state, action) => {
                state.error = "error";
                state.error = action.error.message;
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.status = "succssfully added note ";
                state.notes.push(action.payload);
                state.error = null;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                const noteId = action.payload;
                state.notes = state.notes.filter(note => note.id !== noteId);
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                const { id, values } = action.payload;
                const UpdateNotes = state.notes.find(note => note.id === id);
                if (UpdateNotes) {
                    UpdateNotes.title = values.title;
                    UpdateNotes.content = values.content;
                }
            })
    }
})

export default NoteSlice.reducer