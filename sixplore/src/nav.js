import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <div>
            Logo
        </div>
        <ul>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        {/* <li><Link to='/about'>About</Link></li> */}

        </ul>

    </div>
  )
}
