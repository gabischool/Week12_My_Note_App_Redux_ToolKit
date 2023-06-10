import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditNote from "./components/EditNote";
import Home from "./components/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/EditNote/:id" element={<EditNote />} />
      </Routes>
    </Router>
  );
}

export default App;
