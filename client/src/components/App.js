// import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";

// function App() {
//   return <h1>Project Client</h1>;
// }

// export default App;
import React, { useEffect, useState } from "react";
import { Switch, BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import MoonPhasePage from './MoonPhasePage'; 
import Appointment from "./Appointment";
import Hairstyle from "./Hairstyle";
import Stylist from "./Stylist";
import Login from "./Login";
import Signup from "./Signup"; 
import User from "./User";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  // const login = () =>{
  //   setIsLoggedIn(true);
  // }

  // const logout = () =>{
  //   setIsLoggedIn(false);
  // };

  //   // Add programmatic navigation for login and logout
  // useEffect(() =>{
  //   if (isLoggedIn) {
  //       // navigates to Home route if user is logged in
  //     navigate("/");
  //   } else {
  //       // navigates to Login route if user is logged out
  //     navigate("/login");
  //   };
  // }, [isLoggedIn]);

  return (
    <Router>
      {/* <div className="app">
      <NavBar logout={logout}/>
      <Outlet context={login}/> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moonphase" element={<MoonPhasePage />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/stylist" element={<Stylist />} />
        <Route path="/hairstyle" element={<Hairstyle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/user" element={<User />} />
        {/* <Route path="/search" element={<Search />} /> */}
      </Routes>
      {/* </div>   */}
    </Router>
  );
}

export default App;