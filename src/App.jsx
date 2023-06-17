import Notes from "./components/Notes";
import EditNote from "./components/EditNote";
import AddNote from "./components/AddNote";
import { Routes, Route } from "react-router-dom";

import { useLocation } from "react-router-dom";



function App() {
  
  const location = useLocation();
 

  return (
    <div className="bg-blue-600 min-h-screen flex">
      <div className="w-full">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl text-white mb-5 mt-5">My Notes</h3>
          {
            location.pathname === '/' ? <AddNote />
              :<Routes>
                <Route path="/EditNote/:id" element={<EditNote />} />
              </Routes>
          }
          <Notes />
        </div>
      </div>
    </div>
  );
}

export default App;