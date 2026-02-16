import React, { useState } from "react";
import axios from "axios";

function CreateNote() {
  const [note, setNote] = useState({ title: '', content: '' });

  const handleChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first');
      return;
    }
    try {
      await axios.post('https://notesappproject-ao91.onrender.com/api/notes', note, {
        headers: {
            Authorization: `Bearer ${token}`, // 🔥 FIXED
          },
      });
      alert('Note saved!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to save note');
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0F1A] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-[#1C1F2A] p-8 rounded-xl w-full max-w-2xl shadow-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create New Note</h2>

        <input
          type="text"
          placeholder="Title"
          name="title"
          // value={title}
          required
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-[#2C2F3F] text-white rounded-lg"
        />

        <textarea
          placeholder="Write your note..."
          name="content"
          // value={content}
          required
          onChange={handleChange}
          rows={8}
          className="w-full p-3 bg-[#2C2F3F] text-white rounded-lg resize-none"
        />

        <button type="submit" className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium">
          Save Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
