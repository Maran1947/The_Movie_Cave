import React, { useState, useEffect } from 'react';
import "./Nav.css";
import  { Link } from 'react-router-dom';

function Nav() {
  const [show, handleshow] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleshow(true)
      } else handleshow(false);
    });
    return () => {
      window.removeEventListener("scroll")
    }
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <h1 className="nav_logo"><a href="/">The Movie Cave</a></h1>
      <ul>
        <li><Link to="/" className="search_link">Home</Link></li>
        <li><Link to="/search-movies" className="search_link">Search Movies</Link></li>
        <li>
          <img
            className="nav_avatar"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
            alt="Netflix Logo"
          />
        </li>
      </ul>

    </div>
  )
}

export default Nav;