import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  // const fetchNote = async () => {
  //   try {
  //     const res = await axios.get(`/api/notes/${id}`);
  //     setNote(res.data);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error loading note");
  //   }
  // };

  const deleteNote = async () => {
    try {
      await axios.delete(`/api/notes/${id}`);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response.data.msg || "Failed to delete note");
    }
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`/api/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error(error);
        alert("Error loading note");
      }
    };
    fetchNote();
  }, [id]);

  if (!note) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0E0F1A] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
        <p className="text-gray-300 whitespace-pre-line">{note.content}</p>

        <div className="mt-8 flex gap-4">
          <button onClick={() => navigate(`/edit/${note._id}`)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
            Edit
          </button>
          <button onClick={deleteNote} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
            Delete
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg"
          >
            Share Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
