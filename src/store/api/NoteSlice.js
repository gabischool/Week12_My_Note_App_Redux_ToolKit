import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

export const fetchnotes = createAsyncThunk("note/fetchnotes", async () => {
  const response = await axios.get("http://localhost:9000/notes");
  return response.data;
});
export const addnote = createAsyncThunk("note/addnote", async (newNote) => {
  const response = await axios.post(
    "http://localhost:9000/create_note",
    newNote
  );
  return response.data;
});

export const editnote = createAsyncThunk(
  "note/editnote",
  async ({ noteId, updatednote }) => {
    const response = await axios.put(
      `http://localhost:9000/update_note/${noteId}`,
      updatednote
    );
    return response.data;
  }
);

export const deletenote = createAsyncThunk(
  "note/deletenote",
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
      .addCase(fetchnotes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchnotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchnotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addnote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(editnote.fulfilled, (state, action) => {
        const { noteId, updatednote } = action.payload;
        const existingnote = state.notes.find((note) => note.id === noteId);
        if (existingnote) {
          existingnote.title = updatednote.title;
          existingnote.content = updatednote.content; // Update to 'content' instead of 'author', 'price', 'image'
        }
      })

      .addCase(deletenote.fulfilled, (state, action) => {
        const noteId = action.payload;
        state.notes = state.notes.filter((note) => note.id !== noteId);
      });
  },
});

export default noteSlice.reducer;
