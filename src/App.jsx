import { Route, Routes, useLocation } from "react-router-dom";
import EditNote from "./components/EditNote";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
function App() {
  const location = useLocation()

  return (
    <div className="bg-blue-600 min-h-screen flex">
      <div className="w-full">
        <div className=" bg-white w-full lg:w-[70%] lg:mx-auto grid grid-cols-1">
          <h3 className="text-3xl ml-10 text-blue-500  mb-5 mt-5">My Notes</h3>

          {
            location.pathname === '/' ? <AddNote />
              : <Routes>
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