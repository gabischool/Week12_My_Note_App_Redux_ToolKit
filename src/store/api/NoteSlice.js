

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

export const fetchNotes = createAsyncThunk("note/fetchNotes", async () => {
  const response = await axios.get("http://localhost:9000/notes");
  return response.data;
});

export const addNotes = createAsyncThunk("note/addNotes", async (newNote) => {
  const response = await axios.post("http://localhost:9000/create_note", newNote);
  return response.data;
});



export const editNotes = createAsyncThunk(
  "note/editNotes",
  async ({ id, values }) => {
    const response = await axios.put(
      'http://localhost:9000/update_note/'+ id, values);
      console.log(response);
    return response.data;
  }
);

export const deleteNote = createAsyncThunk(
  "note/deleteNote",
  async (noteId) => {
    await axios.delete(`http://localhost:9000/delete_note/${noteId}`);
    return noteId;
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNotes.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(editNotes.fulfilled, (state, action) => {
        const { id, values } = action.payload;
        const existingNote = state.notes.find((note) => note.id === id);
        if (existingNote) {
          existingNote.title = values.title;
          existingNote.content = values.content;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const noteId = action.payload;
        state.notes = state.notes.filter((note) => note.id !== noteId);
      });
  },
});

export default noteSlice.reducer;
