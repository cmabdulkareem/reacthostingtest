import axios from 'axios'
import React, { Children, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function PrivateRoute({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');  // Get the token from localStorage
    console.log(token)

    if (token) {
        axios.get('http://localhost:3000/authchecking', {
            headers: {
                Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
            },
            withCredentials: true,  // To send cookies with the request if needed
        })
        .then((res) => {
            setIsAuthenticated(res.data.authenticated);  // Assuming 'authenticated' is part of the response
            setLoading(false);
        })
        .catch((err) => {
            setIsAuthenticated(false);  // If there is an error, assume the user is not authenticated
            setLoading(false);
        });
    } else {
        setIsAuthenticated(false);  // If there's no token, the user is not authenticated
        setLoading(false);
    }
}, []);

axios.defaults.withCredentials = true
  
    if(loading){
        return <div>Loading... </div>
    }

    return isAuthenticated ? children : <Navigate to='/login' />

}

export default PrivateRoute
