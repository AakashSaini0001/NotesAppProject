import axios from 'axios';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Login from './Login';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', {username, email, password});
      alert('Registered successfully');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} >

      <input 
      name="name" 
      onChange={(e)=>setUsername(e.target.value)}
      value={username} 
      placeholder="Name" />

      <input 
      name="email" 
      onChange={(e)=>setEmail(e.target.value)}
      value={email}
      placeholder="Email" />
      
      <input 
      name="password" 
      onChange={(e)=>setPassword(e.target.value)}
      value={password}
      placeholder="Password" 
      type="password" />

      <button to={Login} type="submit">Register</button>
      <NavLink to='/login'>Go to Login</NavLink>
    </form>
  );
}
export default Register;