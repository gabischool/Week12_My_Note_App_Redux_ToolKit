/* eslint-disable react/prop-types */

import  { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, fetchNote } from "../store/api/NoteSlice";
import { Link } from "react-router-dom";

function Notes() {
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(fetchNote());
  }, [dispatch])

  const   notes = useSelector((state) => state.note.notes);
  
  const handleDelete = (noteId)=>{
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNote(noteId))
    }
  }
  return (
    <div className="flex flex-wrap bg-white rounded-lg justify-center mt-5">
      {notes.map((note) => (
        <div
          className="relative bg-yellow-400 rounded w-64 h-64 m-5 shadow-2xl overflow-hidden"
          key={note.id}
        >
          <div className="p-5">
            <h3 className="font-bold text-2xl mb-4">{note.title}</h3>
            <p>{note.content}</p>
          </div>
          <div className="absolute bg-yellow-400 w-12 h-12 rotate-45 -top-6 -left-6  " />
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
          <button className="mr-10">
              <Link to={`/EditNote/${note.id}`}>
              <FaEdit className=" " size={26}/>
              </Link>
            </button>
            <button onClick={()=>handleDelete(note.id)}>
              <FaTrash className="text-gray-5000" size={26}/>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notes;