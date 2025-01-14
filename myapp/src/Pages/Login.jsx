import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

  const API = import.meta.env.VITE_BACKEND_URL

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    axios.defaults.withCredentials = true

    useEffect(()=>{
      axios.get(`${API}/authchecking`, {withCredentials: true})
        .then((res)=>{
          if(!res.data.authenticated){
            navigate('/login')
          }else{
            navigate('/dashboard')
          }
        })
        .catch((err)=>{
          navigate('/login')
        })
    }, [])

    

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${API}/login`, { email, password }, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message)
        navigate('/dashboard')
      })
      .catch((err) => {
        toast.error(err.response.data.error)
      })
  }

  return (
    <div>
      <ToastContainer position="top-center"/>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email : </label>
        <input type="email" name="" id='email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <label htmlFor="password">Password</label>
        <input type="password" name="" id='password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <button type="submit">Login</button>        
      </form>
    </div>
  )
}

export default Login
