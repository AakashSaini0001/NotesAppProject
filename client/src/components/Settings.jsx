import React from "react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#0E0F1A] text-white p-6">
      <div className="max-w-3xl mx-auto bg-[#1C1F2A] p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Theme</h3>
          <div className="flex space-x-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg">
              Dark Mode
            </button>
            <button className="bg-gray-300 text-black hover:bg-gray-400 px-4 py-2 rounded-lg">
              Light Mode
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Account</h3>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
