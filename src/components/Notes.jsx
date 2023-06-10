import { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, fetchNote } from "../store/api/NoteSlice";
import { Link } from "react-router-dom";
function Notes() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNote());
  }, [dispatch]);
  const allNotes = useSelector((state) => state.note.notes);
  const handleDelete = (noteId) => {
    const CheckingUserDescistion = window.confirm(
      "are you sure you want to delete this note"
    );
    if (CheckingUserDescistion) {
      dispatch(deleteNote(noteId));
    }
  };
  return (
    <div className=" grid grid-cols-2  lg:grid-cols-3 gap-5 mt-5  p-10 w-[70%]">
      {allNotes.map((note) => (
        <div
          className="p-4 rounded bg-yellow-500 relative"
          key={note.id}
          id="box-note">
          <h1 className="text-[#fff] font-bold">{note.title}</h1>
          <p className="text-white text-left pb-3 overflow-hidden">
            {note.content}
          </p>
          <div className="w-full flex justify-between items-center text-[#fff] ">
            <Link to={`/EditNote/${note.id}`}>
              <FaEdit className="cursor-pointer" />
            </Link>
            <FaTrash
              onClick={() => handleDelete(note.id)}
              className="cursor-pointer "
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notes;
