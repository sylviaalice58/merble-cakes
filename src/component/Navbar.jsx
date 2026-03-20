import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import cake from "../image/download.png";



const Navbar = () => {
  return (
    <nav className="cake-navbar navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand brand-logo" to="/">
          <img src= {cake} alt="" width="50px" height="50px"/> Merble Cakes
        </Link>

        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#cakeNavbar"
          aria-controls="cakeNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="cakeNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link cake-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link cake-link" to="/products">
                Cakes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link cake-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link cake-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link order-btn" to="/signup">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;