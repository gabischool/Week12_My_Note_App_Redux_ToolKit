import React, { useEffect, useState } from "react";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";




function App() {
  
  

  const [editMode, setEditMode] = useState(false);

  const [selectedNote, setSelectedNote] = useState(false);

 


  const handleEdit = (id, note) => {
    setEditMode(true);
    setSelectedNote(note);
    console.log(note);
  };

  return (
    <div className="bg-blue-600 min-h-screen flex">
      <div className="w-full">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl text-white mb-5 mt-5">My Notes</h3>
          {editMode ? (
            <EditNote
              initialValue={selectedNote}
            
              

            />
          ) : (
            <AddNote />
          )}

          <Notes handleEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
}

export default App;