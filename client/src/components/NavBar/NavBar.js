import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css';

function NavBar({ logout, isLoggedIn }) {
  return (
    <header className="navbar">
      <nav>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/moon-phases" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Moon Phase</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/hairstyles" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Hairstyle</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/stylists" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Stylist</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/appointments/new" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Book an Appointment</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/appointments" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>View Appointments</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/users" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>User</NavLink>
          </li>
          {!isLoggedIn ? (
            <>
              <li className="nav-item">
                <NavLink to="/signup" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Signup</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Login</NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
         

export default NavBar;
