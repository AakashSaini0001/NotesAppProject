import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      const res = await axios.get(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setTitle(res.data.title);
      setContent(res.data.content);
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:5000/api/notes/${id}`,
      { title, content },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#0E0F1A] px-4">
      <form
        onSubmit={handleUpdate}
        className="bg-[#1C1F2A] p-8 rounded-xl shadow-md w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Edit Note</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 rounded-lg mb-4 bg-[#2C2F3F] text-white focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Content"
          rows="6"
          className="w-full p-3 rounded-lg bg-[#2C2F3F] text-white focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 mt-4 py-3 rounded-lg text-white font-medium"
        >
          Update Note
        </button>
      </form>
    </div>
  );
};

export default EditNote;
