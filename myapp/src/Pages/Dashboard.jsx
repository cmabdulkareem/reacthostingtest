import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

    const [name, setName] = useState("")

    const navigate = useNavigate()


  return (
    <div>
      <h1>Welcome {name} to dashboard</h1>
      <p>This is your personal dashboard, where you can manage your profile and activities</p>
    </div>
  )
}

export default Dashboard
