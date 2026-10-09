import { useState } from "react";
import axios from "axios";

const api = axios.create({ baseURL: "https://gmb-crm.onrender.com/api" });

export default function App() {
  const [email, setEmail] = useState("admin@gmb.com");
  const [password, setPassword] = useState("123456");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { email, password });
      alert("Register ho gaya! Ab Login karo");
    } catch (e) {
      alert(e.response?.data?.msg || "Error");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      alert("Login Success!");
      localStorage.setItem("token", res.data.token);
    } catch (e) {
      alert(e.response?.data?.msg || "Login Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">G</div>
          <h1 className="text-3xl font-extrabold text-gray-900">GMB CRM</h1>
          <p className="text-gray-500 mt-2 font-medium">Franchise AD Assist & Multi-Outlet CRM</p>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none font-medium" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none font-medium" />
          </div>
          <div className="flex gap-4 pt-2">
            <button onClick={handleRegister} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold">1. Register</button>
            <button onClick={handleLogin} className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold">2. Login</button>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-8 font-medium">Secure Login • Franchise Owner & Vendor Dashboard</p>
      </div>
    </div>
  );
}