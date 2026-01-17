import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate hook

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchNotes = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/notes/', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          });
          console.log("Notes Response:", res.data);
          setNotes(Array.isArray(res.data) ? res.data : res.data.notes || []);
        } catch (err) {
          console.error('Failed to load notes', err.response?.data?.msg || err.message);
        }
      };


    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-[#0E0F1A] text-white px-6 py-10 ">
      <div className="flex justify-between items-center mb-6"> {/* Corrected typo */}
        <h1 className="text-3xl font-bold">My Notes</h1>
        <button
          onClick={() => navigate("/create-note")} // Corrected function call and route
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          + New Note
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length > 0 ? notes.map((note) => (
          <div
            key={note._id}
            onClick={() => navigate(`/note/${note._id}`)} // Corrected function call and route
            className="bg-[#1C1F2A] p-5 rounded-xl hover:bg-[#252837] cursor-pointer transition"
          >
            <h3 className="text-xl font-semibold">{note.title}</h3>
            <p className="text-gray-400 mt-2 line-clamp-3">{note.content}</p>
          </div>
        )) : (
          <p className="text-gray-500 col-span-full text-center">No notes found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;