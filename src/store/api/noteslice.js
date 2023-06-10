import { createSlice, createAsyncThunk,   } from "@reduxjs/toolkit";
import axios from "axios";
// import AddNote from "../components/AddNote";

const initialState ={
    notes:[],
    status:"idle",
    Error:"null"
};


///fetch notes
export const fetchNotes = createAsyncThunk('http://localhost::9000/notes', async()=>{
 const reponse= await axios.get('http://localhost:9000/notes') 
 return reponse.data });
 
 

 

export const AddNotes = createAsyncThunk('note/AddNotes', async(Newnote)=>
{ const response = await axios.post('http://localhost:9000/create_note' , Newnote)
    return response.data

});

export const DeleteNotes = createAsyncThunk('note/DeleteNotes', async(id)=>{
     await axios.delete(`http://localhost:9000/delete_note/${id}`)
    return id 
});

export const UPDATENotes = createAsyncThunk('note/UpdateNotes', async({noteId,updateNote})=>{
    const response = await axios.put(`http://localhost:9000/update_note/${noteId}`,updateNote)
    return response.data});
export const noteslice = createSlice({
    name:"note",
        initialState ,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(fetchNotes.pending,(state)=>{
                state.status="loading";
                state.Error="null";
            })
            .addCase(fetchNotes.fulfilled,(state,action)=>{

                state.status="succeeded";
                state.notes=action.payload;
               
            })
            .addCase(fetchNotes.rejected, (state,action) => {
                state.state="failed";
                state.Error=action.error.message;

            } )
            .addCase(AddNotes.fulfilled, (state,action)=>{
                state.notes.push(action.payload);
        })
        .addCase(UPDATENotes.fulfilled, (state,action)=>{
            const {noteId,updateNote}=action.payload;
            
            const exisistingnotes=state.notes.find(note=>note.id===noteId);
            if(exisistingnotes){
                exisistingnotes.title=updateNote.title;
                exisistingnotes.content=updateNote.content;
            }
        })
     .addCase(DeleteNotes.fulfilled,(state,action)=>{
        const noteId = action.payload;
            state.notes=state.notes.filter(note=>note.id!==noteId);
            // state.notes(action.payload);
        });
    }
});
// export const ALLnotes = (state)=>{
//      state.note.notes;
// }
// export const Selectstatus=(state)=>{
//     state.note.contents;
// }
// export const Error=(state)=>{
//     state.note.Error;
// }
export default noteslice.reducer;