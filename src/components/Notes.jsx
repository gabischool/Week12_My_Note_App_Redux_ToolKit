/* eslint-disable react/prop-types */
import React, {useEffect} from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {  deleteNote, fetchNotes } from "../store/api/NoteSlice";
import { useSelector, useDispatch } from "react-redux";


function Notes() {


const allNote = useSelector((state) => state.note.notes);

console.log(allNote);

const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);
 

  const handleNoteDelete = (noteId) => {
    dispatch( deleteNote(noteId));
  };


  
  return (
    <div className="flex flex-wrap justify-center mt-5">
      {allNote.map((not) => (
        <div
          className="relative bg-yellow-400 w-64 h-64 m-5 shadow-2xl overflow-hidden"
          key={not.id}
        >
          <div className="p-5">
            <h3 className="font-bold text-2xl mb-4">{not.title}</h3>
            <p>{not.content}</p>
          </div>
          <div className="absolute bg-yellow-400 w-12 h-12 rotate-45 -top-6 -left-6" />
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
            <button className="mr-2">
              <FaEdit size={20}  />
            </button>
            <button>
              <FaTrash size={20} onClick={()=> handleNoteDelete(not.id)}/>
            </button>
          </div>
        </div>
      ))} 
    </div>
  );
}

export default Notes;