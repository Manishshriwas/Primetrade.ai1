
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Login Data:", { email, password });
    
    // Validate inputs
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try{
       
        const response=await fetch(`${API_BASE}/api/auth/login`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email,password}),
            
        });
        
        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);
        
        if (response.ok) {
            console.log("Login successful!");
            toast.success("Login successful");
            const res_data = await response.json();
            console.log("Response data:", res_data);

            // Store user data and token in context and localStorage
            login(res_data.user, res_data.token);
            
            setEmail("");
            setPassword("");
            
            // Redirect to profile page
            navigate('/profile');
        }
        else {
            console.log("Login failed with status:", response.status);
            const errorData = await response.json();
            console.error("Login failed:", errorData);
            toast.error(errorData.message || "Login failed");
        }
    }
    catch (error) {
      console.error("Login error:", error);
      toast.error("Network error occurred: " + error.message);
    }

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <label className="block mb-2">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-6"
          required
        />

        <button 
          type="submit" 
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
