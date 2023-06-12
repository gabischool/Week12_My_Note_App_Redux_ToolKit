import React from "react";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
// import EditNote from "./components/EditNote";




function App() {

  

  return (
    <div className="bg-blue-600 min-h-screen flex">
      <div className="w-full">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl text-white mb-5 mt-5">My Notes</h3>
          {/* { {editMode ? (
            <EditNote
              initialValues={selectedNote}
              editNote={handleUpdateNote}
            />
          ) : (
            <AddNote createNote={createNote} />
          )}

          
 
          <Notes notes={notes} deleteNote={deleteNote} handleEdit={handleEdit} /> } */}
          <AddNote/>
          <Notes/>
        </div>
      </div>
    </div>
  );
}

export default App;