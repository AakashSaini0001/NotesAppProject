import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SharedNote = () => {
  const { shareId } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");
  const apiBaseUrl = "http://localhost:5000";

  useEffect(() => {
    const fetchSharedNote = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/share/${shareId}`);
        setNote(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Unable to load shared note");
      }
    };

    fetchSharedNote();
  }, [apiBaseUrl, shareId]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0E0F1A] text-white p-8">
        <div className="max-w-3xl mx-auto bg-[#1C1F2A] border border-[#2f334d] rounded-xl p-6">
          <h1 className="text-2xl font-semibold mb-2">Shared note unavailable</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <Link className="text-indigo-400 hover:text-indigo-300" to="/login">
            Log in to your account
          </Link>
        </div>
      </div>
    );
  }

  if (!note) {
    return <div className="min-h-screen bg-[#0E0F1A] text-white p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0E0F1A] text-white p-8">
      <div className="max-w-3xl mx-auto bg-[#1C1F2A] border border-[#2f334d] rounded-xl p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Shared Note</p>
        <h1 className="text-3xl font-bold mt-2">{note.title}</h1>
        <p className="text-gray-300 whitespace-pre-line mt-4">{note.content}</p>
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <span>Last updated: {new Date(note.updatedAt).toLocaleString()}</span>
          <Link className="text-indigo-400 hover:text-indigo-300" to="/login">
            Open your workspace
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SharedNote;
