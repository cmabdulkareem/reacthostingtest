import axios from 'axios'
import React, { Children, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function PrivateRoute({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(()=>{
    axios.get("http://localhost:3000/authchecking", {withCredentials: true})
        .then((res)=>{
            setIsAuthenticated(res.data.authenticated)
            setLoading(false)
        })
        .catch((err)=>{
            setIsAuthenticated(false)
            setLoading(false)
        })
}, [])

axios.defaults.withCredentials = true
  
    if(loading){
        return <div>Loading... </div>
    }

    return isAuthenticated ? children : <Navigate to='/login' />

}

export default PrivateRoute
