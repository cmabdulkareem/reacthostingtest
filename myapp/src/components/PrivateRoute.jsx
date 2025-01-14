import axios from 'axios'
import React, { Children, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function PrivateRoute({children}) {

    const API = import.meta.env.VITE_BACKEND_URL

    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  useEffect(()=>{
    axios.get(`${API}/authchecking`, {withCredentials: true})
        .then((res)=>{
            setIsAuthenticated(res.data.authenticated)
            setLoading(false)
        })
        .catch((err)=>{
            setIsAuthenticated(false)
            setLoading(false)
        })
}, [])

  
    if(loading){
        return <div>Loading... </div>
    }

    return isAuthenticated ? children : <Navigate to='/login' />

}

export default PrivateRoute
