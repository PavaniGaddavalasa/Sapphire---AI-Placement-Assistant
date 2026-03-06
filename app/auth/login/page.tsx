"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = (e:any)=>{
    e.preventDefault()

    const storedUser = localStorage.getItem("user")

    if(!storedUser){
      alert("No account found. Please sign up first.")
      return
    }

    const user = JSON.parse(storedUser)

    if(email === user.email && password === user.password){
      alert("Login successful")
      router.push("/profile")
    }else{
      alert("Invalid email or password")
    }
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-[350px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
          className="w-full mt-2 border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?
        </p>

        <button
          onClick={()=>router.push("/auth/sign-up")}
          className="w-full mt-2 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
        >
          Create Account
        </button>

      </div>

    </div>

  )
}