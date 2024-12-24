import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post("https://reacthostingtest.onrender.com/register", {name, email, password}, {withCredentials: true})
            .then((res)=>{
                toast.success(res.data.message)
              })
              .catch((err)=>{
                toast.error(err.response.data.error)
            })
    }

  return (
    <div>
      <ToastContainer position="top-center"/>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name : </label>
        <input type="text" name="" id='name' onChange={(e)=>setName(e.target.value)} value={name}/>
        <label htmlFor="email">Email : </label>
        <input type="email" name="" id='email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <label htmlFor="password">Password</label>
        <input type="password" name="" id='password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <button type="submit">Register</button>        
      </form>

      <h1>Response : {response}</h1>


    </div>
  )
}

export default Register
