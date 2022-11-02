import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forgetpage from "./pages/Forgetpage";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-page" element={<Register />} />
          <Route path="/loginpage" element={<Login />} />
          <Route path="forgetpage" element={<Forgetpage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
