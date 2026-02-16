import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Send login request
      const res = await axios.post('https://notesappproject-ao91.onrender.com/api/users/login', { email, password });
      
      // Assuming the response body contains a token AND user info (like username)
      const { token, user: userData } = res.data; 
      
      localStorage.setItem('token', res.data.token);
      
      // 2. Critical: Call setUser with the user's display name or username.
      // NOTE: You must ensure your backend API returns a field like 'username' or 'name'.
      const username = userData?.name || userData?.username || email; 
      setUser(username); 

      alert(`Welcome, ${username}!`);
      
      // 3. Navigate only upon successful login and state update
      navigate('/dashboard'); 
      
    } catch (err) {
      // Set error message from the response or a default
      const errorMessage = err.response?.data?.msg || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      alert(errorMessage);
    }
  };
  return (
    <div className="flex h-screen bg-[#0E0F1A] items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-[#1C1F2A] p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
              type="email"
              name="email"
              id="email"
              className="w-full p-3 rounded-lg bg-[#2C2F3F] text-white focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="example@mail.com"
              required
              autoComplete="email"
            />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full p-3 rounded-lg bg-[#2C2F3F] text-white focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
        </div> 

        {/* Removed redundant onClick on button. The form's onSubmit handles navigation. */}
        <button
          type="submit"
          id="login"
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg text-white font-medium"
        >
          Login
        </button>

        <p className="text-sm text-gray-400 text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-500 cursor-pointer hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
      {/* Display error message clearly */}
      {error && <p className="text-sm text-red-400 text-center mt-4 p-2 bg-[#2C2F3F] rounded-lg">{error}</p>}
    </div>
  );
};

export default Login;