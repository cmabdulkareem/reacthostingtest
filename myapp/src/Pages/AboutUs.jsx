import React from 'react'
import {Outlet} from 'react-router-dom'


function AboutUs() {

  const Header = Outlet

  return (
    <div>
      <h1>About us</h1>
      <Header />
    </div>
  )
}

export default AboutUs
