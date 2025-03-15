import '../css/NavBar.css';
import React from 'react';
import { Link } from 'react-router-dom';  

function NavBar() {
  return (
    <nav className='navbar'>
        <div className='navbar-brand'>
            <Link to="/">Movie App</Link>
        </div>
        <div className='navbar-link'>
            <Link to = "/" className = "nav-link">Home</Link>
            <Link to = "/favorites" className = "nav-link">Favorite</Link>
        </div>
    </nav>
  )
}

export default NavBar