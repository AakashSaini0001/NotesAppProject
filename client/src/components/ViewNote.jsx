import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [shareLink, setShareLink] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const navigate = useNavigate();
  const apiBaseUrl = "http://localhost:5000";

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
      await axios.delete(`${apiBaseUrl}/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/dashboard");
    } catch (error) {
      alert(error.response.data.msg || "Failed to delete note");
    }
  };

  const createShareLink = async () => {
    try {
      setIsSharing(true);
      const res = await axios.post(
        `${apiBaseUrl}/api/notes/${id}/share`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const link = `${window.location.origin}/share/${res.data.shareId}`;
      setShareLink(link);
      await navigator.clipboard.writeText(link);
      alert("Share link copied to clipboard!");
    } catch (error) {
      alert(error.response?.data?.msg || "Failed to create share link");
    } finally {
      setIsSharing(false);
    }
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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

        <div className="mt-8 flex flex-wrap gap-4">
          <button onClick={() => navigate(`/edit/${note._id}`)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
            Edit
          </button>
          <button onClick={deleteNote} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
            Delete
          </button>
          <button
            onClick={createShareLink}
            disabled={isSharing}
            className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg"
          >
            {isSharing ? "Creating..." : "Share Link"}
          </button>
        </div>

        {shareLink ? (
          <div className="mt-6 bg-[#1C1F2A] border border-[#2f334d] rounded-xl p-4">
            <p className="text-sm text-gray-400">Share this link on any platform:</p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                className="w-full bg-[#0E0F1A] text-gray-200 px-3 py-2 rounded-lg border border-[#2f334d]"
                value={shareLink}
                readOnly
              />
              <button
                onClick={() => navigator.clipboard.writeText(shareLink)}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
              >
                Copy Link
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ViewNote;
