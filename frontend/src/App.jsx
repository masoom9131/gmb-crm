import { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

function App() {
  const [email, setEmail] = useState("admin@gmb.com");
  const [password, setPassword] = useState("123456");

  const handleRegister = async () => {
    try {
      console.log("Trying register:", email);
      const res = await api.post("/auth/register", { name: "Admin", email, password });
      console.log(res.data);
      alert("Register Success! Ab Login dabao");
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("Response:", err.response);
      alert("Register Fail: " + (err.response?.data?.message || err.response?.data?.msg || err.message || JSON.stringify(err.response?.data)));
    }
  };

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login SUCCESS! ✅ Connected");
    } catch (err) {
      console.log("FULL ERROR:", err);
      alert("Login Fail: " + (err.response?.data?.message || err.response?.data?.msg || err.message));
    }
  };

  return (
    <div style={{ padding: 50, fontFamily: 'Arial' }}>
      <h2>GMB CRM Login Test</h2>
      <input style={{padding:10, width:250, border:'1px solid black'}} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" /><br/><br/>
      <input style={{padding:10, width:250, border:'1px solid black'}} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" /><br/><br/>
      <button style={{padding:10, marginRight:10}} onClick={handleRegister}>1. Register</button>
      <button style={{padding:10}} onClick={handleLogin}>2. Login</button>
      <p style={{marginTop:20, fontSize:12, color:'gray'}}>F12 dabake Console dekho error ke liye</p>
    </div>
  )
}
export default App;