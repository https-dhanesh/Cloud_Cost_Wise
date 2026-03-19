import React, { useState } from 'react';
import API from '../api';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', formData);
      localStorage.setItem('token', data.token); 
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard'); 
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-700">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-600 p-3 rounded-full mb-4">
            <LogIn className="text-white" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-slate-400">Log in to CloudCost-Wise</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-500" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-green-500 outline-none"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-green-500 outline-none"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-green-900/20">
            Login
          </button>
        </form>
        <p className="text-center text-slate-400 mt-6 text-sm">
          Don't have an account? <Link to="/register" className="text-green-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;