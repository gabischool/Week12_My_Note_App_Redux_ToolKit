import { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {  useDispatch, useSelector } from "react-redux";
import { deleteNote, fetchNote } from "../store/api/NoteSlice";
import { Link } from "react-router-dom";
function Notes() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchNote())
  },[dispatch])
  const allNotes = useSelector((state)=>state.note.notes);
  const handleDelete = (noteId)=>{
    const noteSure = window.confirm("Are you sure you want to delete")
    if(noteSure){
      dispatch(deleteNote(noteId))
    }
  }
  console.log(allNotes)
  return (
    <div className=" grid grid-cols-2  lg:grid-cols-3 gap-5 mt-5  p-10 w-full">
      {allNotes.map((note) => (
        <div
          className="relative  h-64  shadow-2xl hover:shadow-inner hover:bg-blue-600 duration-500 ease-in-out hover:rounded-md hover:text-white cursor-pointer overflow-hidden"
          key={note.id}
        >
          <div className="p-5">
            <h3 className="font-bold text-2xl mb-4 text-blue-500 capitalize">{note.title}</h3>
            <p>{note.content}</p>
          </div>
          <div className="absolute w-12 h-12 rotate-45 -top-6 -left-6" />
          <div className="absolute bottom-0 left-0 right-0 flex justify-start p-4">
            <button className="mr-2">
              <Link to={`/EditNote/${note.id}`}>
              <FaEdit className="text-green-500" size={20}/>
              </Link>
            </button>
            <button onClick={()=>handleDelete(note.id)}>
              <FaTrash className="text-red-500" size={20}/>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notes;