import { Route, Routes, useLocation } from "react-router-dom";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";

function App() {
  const location = useLocation();

  return (
    <div className="bg-blue-600 min-h-screen flex">
      <div className="w-full">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl text-white mb-5 mt-5">My Notes</h3>

          <Routes>
            <Route path="/" element={<AddNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
          </Routes>

          {location.pathname !== "/" && <Notes />}
        </div>
      </div>
    </div>
  );
}

export default App;
