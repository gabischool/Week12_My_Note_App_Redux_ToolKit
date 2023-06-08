/* eslint-disable react/prop-types */

import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, deleteNote } from "../store/NoteSlice";
import { Link } from "react-router-dom";

function Notes() {


  const dispatch = useDispatch()
  
useEffect(() => {
  dispatch(fetchNotes());
},[dispatch])



const allNote = useSelector(state => state.note.notes)

console.log(allNote);

const handleDelet = (id) =>{
  dispatch(deleteNote(id))
}



  return (
    <div className="flex flex-wrap justify-center mt-5">
        {
          allNote.map((note) =>(
            <div
          className="relative bg-yellow-400 w-64 h-64 m-5 shadow-2xl overflow-hidden"
          key={note.id}
        >
          <div className="p-5">
            <h3 className="font-bold text-2xl mb-4">{note.title}</h3>
            <p>{note.content}</p>
          </div>
          <div className="absolute bg-yellow-400 w-12 h-12 rotate-45 -top-6 -left-6" />
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
            <Link to={`edit_note/${note.id}`}>
            <button className="mr-2">
              <FaEdit />
            </button>
            </Link>
            <button onClick={()=>handleDelet(note.id)}>
              <FaTrash/>
            </button>
          </div>
        </div>
          ))
        }
    </div>
  );
}

export default Notes;