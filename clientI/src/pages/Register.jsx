
import { useState } from "react";
import {toast} from 'react-toastify'

export default function Register() {


   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Register Data:", { name, email, password });
    try{
        const response=await fetch('http://localhost:8000/api/auth/register',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({name,email,password})
        });
        const data=await response.json();
        console.log("Success:",data);
        if(response.ok){
            toast.success("Sign Up successful");
            setName("");
            setEmail("");
            setPassword("");
        }
        else{
            toast.error("REGISTRATION FAILED");
        }
    }
    catch(error){
        toast.error("REGISTRATION FAILED");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <label className="block mb-2">Name</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

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
          Signup
        </button>
      </form>
    </div>
  );
}
