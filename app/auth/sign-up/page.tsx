"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignUpPage() {

  const router = useRouter()

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")

  const handleSignup = (e:any)=>{
    e.preventDefault()

    if(password !== confirmPassword){
      alert("Passwords do not match")
      return
    }

    const user = {
      name:name,
      email:email,
      password:password
    }

    localStorage.setItem("user",JSON.stringify(user))

    alert("Signup successful!")

    router.push("/auth/login")
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[350px]">

        <h1 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          {/* SIGNUP BUTTON */}
          <button
  type="submit"
          className="w-full mt-2 border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50"
>
  Create Account
</button>

        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?
        </p>

        <button
          onClick={()=>router.push("/auth/login")}
          className="w-full mt-2 border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50"
        >
          Login
        </button>

      </div>

    </div>
  )
}