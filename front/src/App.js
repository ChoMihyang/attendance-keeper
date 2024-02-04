import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Detail from "./components/Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route path="/:staff_id" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:staff_id/:staff_id" element={<Detail />}/>
      </Routes>
    </Router>
  );
}

export default App;
