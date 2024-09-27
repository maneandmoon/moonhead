// // import React from "react";
// // import { NavLink } from "react-router-dom";
// // import './NavBar.css';

// // function NavBar() {
// //   return (
// //     <header className="navbar">
// //       <nav>
// //         <ul className="nav-links">
// //           <li className="nav-item"><NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink></li>
// //           <li className="nav-item"><NavLink to="/user" className="nav-link" activeClassName="active">User</NavLink></li>
// //           <li className="nav-item"><NavLink to="/appointment" className="nav-link" activeClassName="active">Appointment</NavLink></li>
// //           <li className="nav-item"><NavLink to="/hairstyle" className="nav-link" activeClassName="active">Hairstyle</NavLink></li>
// //           <li className="nav-item"><NavLink to="/moonphase" className="nav-link" activeClassName="active">Moon Phase</NavLink></li>
// //           <li className="nav-item"><NavLink to="/signup" className="nav-link" activeClassName="active">Signup</NavLink></li>
// //           <li className="nav-item"><NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink></li>
          
// //         </ul>
// //       </nav>
// //     </header>
// //   );
// // }

// // export default NavBar;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import './NavBar.css';

// function NavBar({ logout }) {
//   return (
//     <header className="navbar">
//       <nav>
//         <ul className="nav-links">
//           <li className="nav-item">
//             <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/moonphase" className="nav-link" activeClassName="active">Moon Phase</NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/hairstyle" className="nav-link" activeClassName="active">Hairstyle</NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/appointment" className="nav-link" activeClassName="active">Appointment</NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/stylist" className="nav-link" activeClassName="active">Stylist</NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/user" className="nav-link" activeClassName="active">User</NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/signup" className="nav-link" activeClassName="active">Signup</NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
//             <button onClick={logout}>Logout</button>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default NavBar;


import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css';

function NavBar({ logout }) {
  return (
    <header className="navbar">
      <nav>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/moonphase" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Moon Phase</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/hairstyle" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Hairstyle</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/appointment" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Appointment</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/stylist" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Stylist</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>User</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Signup</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Login</NavLink>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
