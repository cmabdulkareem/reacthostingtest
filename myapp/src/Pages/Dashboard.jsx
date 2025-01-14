import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";

function Dashboard() {

  const [name, setName] = useState("")

  const navigate = useNavigate()



  const handleLogout = () => {
    axios
      .get('http://localhost:3000/logoutHandler', {}, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate('/login');
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div className='container'>
      <div className="row">
        <div className="col-8">
          <h1>Welcome {name} to dashboard</h1>
          <p>This is your personal dashboard, where you can manage your profile and activities</p>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
