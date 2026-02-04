import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import CreateNote from "./components/CreateNote";
import ViewNote from "./components/ViewNote";
import SharedNote from "./components/SharedNote";
import Settings from "./components/Settings.jsx";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Register from "./components/Register.jsx";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  return (

    <>
    <div className="flex h-full w-full">
      <Sidebar user = {user} className="w-full" />
      <div className="w-full">
      <Navbar className="w-full"/>
      <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/view-notes" element={<ViewNote />} />
          <Route path="/note/:id" element={<ViewNote />} />
          <Route path="/share/:shareId" element={<SharedNote />} />
          <Route path="/settings" element={<Settings />} />
          {/* <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} /> */}
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/register" element={user ? <Navigate to="/" /> : <Register/>} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} 
          />
          <Route 
              path="/register" 
              element={user ? <Navigate to="/dashboard" /> : <Register setUser={setUser} />} 
          />
        </Routes>
      </div>
    </div>
    </>
  );
}

export default App;
