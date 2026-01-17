import React from 'react';
import { Trash2 } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      {/* Modal Box */}
      <div className="bg-[#1C1F2E] w-[90%] max-w-sm p-6 rounded-2xl border border-[#2f334d] shadow-xl text-white">
        {/* Trash Icon */}
        <div className="flex justify-center mb-4">
          <Trash2 size={36} className="text-red-500" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center">Delete Note?</h2>
        <p className="text-sm text-gray-400 text-center mt-2">
          Are you sure you want to delete this note? This action cannot be undone.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm rounded-lg border border-gray-500 text-gray-300 hover:text-white hover:border-white transition"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-5 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
