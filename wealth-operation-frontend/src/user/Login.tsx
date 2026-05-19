import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//import "../styles/Auth.css";
import axios from "axios";
//import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 //const { setAuth } = useAuth();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4004/api/auth/login", { email, password });
      console.log(res.data);
      if (res.data.success /* && res.data.token */ && res.data.user) {

       // setAuth(res.data.token, res.data.data);
        setMessage("");
        setEmail("");
        setPassword("");
        navigate('/admin',{ replace: true });
      } else {
        setMessage(res.data.message || "Login failed");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <div >
        <div className="flex flex-col items-center justify-center">
          <div>
            <h1 className="text-[40px]">Fintech</h1>
            
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input className="border-[1px] rounded-2xl"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {message && <div className={`message ${message.includes("Login") || message.includes("Successful") ? "success" : "error"}`}>
              {message}
            </div>}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default Login;
