import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// import { Switch, BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import MoonPhasePage from './MoonPhasePage'; 
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import AppointmentDetail from "./AppointmentDetail";
import EditAppointmentPage from "./EditAppointmentPage";
import Hairstyle from "./Hairstyle";
import Stylist from "./Stylist";
import Login from "./Login";
import Signup from "./Signup"; 
import User from "./User";

function App() {
    const [appointments, setAppointments] = useState([]);
    const [users, setUsers] = useState([]);
    const [hairstyles, setHairstyles] = useState([]);
    const [stylists, setStylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null); // To store user data

    const navigate = useNavigate();
        
    const login = (userData) => {
      setIsLoggedIn(true);
      setUser(userData); // Store user data on login
    };
  
    const logout = () => {
      setIsLoggedIn(false);
      setUser(null); // Clear user data on logout
    };

   
    // useEffect(() => {
    //   fetch("http://127.0.0.1:5555/appointments")
    //     .then(res => {
    //       if (res.ok) {
    //         return res.json();
    //       } else {
    //         throw new Error("Failed to fetch appointments");
    //       }
    //     })
    //     .then(data => setAppointments(data))
    //     .catch(err => console.error("Unable to reach the server:", err));
    // }, []);

    // useEffect(() => {
    //   fetch("http://127.0.0.1:5555/appointments")
    //     .then(res => res.json())
    //     .then(data => setAppointments(data))
    //     .catch(err => console.error("Unable to reach the server:", err));
    // }, []);

    // useEffect(() => {
    //   fetch("http://127.0.0.1:5555/appointments")
    //     .then(res => {
    //       if (!res.ok) {
    //         throw new Error("Failed to fetch appointments");
    //       }
    //       return res.json();
    //     })
    //     .then(data => setAppointments(data))
    //     .catch(err => console.error("Unable to reach the server:", err));
    // }, []); 

    useEffect(() => {
      fetch("http://127.0.0.1:5555/appointments")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch appointments");
          }
          return res.json();
        })
        .then((data) => {
          setAppointments(data);
          setLoading(false); // Loading complete
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false); // Even if there's an error, loading should stop
        });
    }, []);

    useEffect(() => {
      // Fetch users
      fetch("http://127.0.0.1:5555/users")
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
      // Fetch hairstyles
      fetch("http://127.0.0.1:5555/hairstyles")
        .then(res => res.json())
        .then(data => setHairstyles(data))
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
      // Fetch stylists
      fetch("http://127.0.0.1:5555/stylists")
        .then(res => res.json())
        .then(data => setStylists(data))
        .catch(err => console.error(err));
    }, []);

    // const updateAppointment = (updatedAppointment) => {
    //   fetch(`http://127.0.0.1:5555/appointments/${updatedAppointment.id}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(updatedAppointment),
    //   })
    //     .then(res => {
    //       if (res.ok) {
    //         setAppointments((current) =>
    //           current.map((appointment) =>
    //             appointment.id === updatedAppointment.id ? updatedAppointment : appointment
    //           )
    //         );
    //       } else {
    //         throw new Error("Failed to update appointment");
    //       }
    //     })
    //     .catch(err => console.error(err));
    // };

    // const updateAppointment = (updatedAppointment) => {
    //   fetch(`http://127.0.0.1:5555/appointments/${updatedAppointment.id}`, {
    //     method: 'PATCH', 
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(updatedAppointment),
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error('Failed to update appointment');
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       // Handle successful update, e.g., redirect or show message
    //       console.log('Appointment updated:', data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // };

    const updateAppointment = (updatedAppointment) => {
      return fetch(`http://127.0.0.1:5555/appointments/${updatedAppointment.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAppointment),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update appointment');
          }
          return response.json();
        })
        .then((data) => {
          alert('Appointment updated successfully!'); // Alert on successful update
          console.log('Appointment updated:', data);
          setAppointments((current) =>
            current.map((appointment) =>
              appointment.id === data.id ? data : appointment
            )
          );
          // return data; // Return the updated appointment data
        })
        .catch((error) => {
          console.error(error);
          alert('Failed to update appointment.'); // Alert on failure
        });
    };

    // const addAppointment = (appointment) =>
    //     setAppointments((current) => [...current, appointment]);

    // const addAppointment = (newAppointment) => {
    //   setAppointments((prev) => [...prev, newAppointment]); // Add to local state
    //   fetchAppointments();
    // };

    // const fetchAppointments = () => {
    //   fetch("http://127.0.0.1:5555/appointments")
    //     .then((res) => {
    //       if (!res.ok) {
    //         throw new Error("Failed to fetch appointments");
    //       }
    //       return res.json();
    //     })
    //     .then((data) => {
    //       setAppointments(data);
    //     })
    //     .catch((err) => console.error("Unable to reach the server:", err));
    // };

    // const addAppointment = (newAppointment) => {
    //   fetch("http://127.0.0.1:5555/appointments", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newAppointment),
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error("Failed to book appointment");
    //       }
    //       return response.json();
    //     })
    //     .then((appointment) => {
    //       setAppointments((prev) => [...prev, appointment]); // Update state with new appointment
    //       alert("Appointment booked successfully!");
    //       navigate("/appointments"); // Redirect to appointments page or detail page
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       alert("Failed to book appointment.");
    //     });
    // };

    const addAppointment = (newAppointment) => {
      return fetch("http://127.0.0.1:5555/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppointment),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(err.message || 'Failed to book appointment');
            });
          }
          return response.json();
        })
        .then((appointment) => {
          setAppointments((prev) => [...prev, appointment]); // Update state with new appointment
          alert("Appointment booked successfully!");
          navigate("/appointments"); // Redirect to appointments page or detail page
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to book appointment: " + error.message);
        });
    };
    
    

    const deleteAppointment = (id) => {
      fetch(`http://127.0.0.1:5555/appointments/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            setAppointments((current) => current.filter(app => app.id !== id));
            alert("Appointment deleted successfully");
          } else {
            throw new Error("Failed to delete appointment");
          }
        })
        .catch((err) => console.error(err));
    }; 

    if (loading) return <p>Loading appointments...</p>;
    if (error) return <p>Error: {error}</p>;





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
    <>
      <NavBar logout={logout} isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moon-phases" element={<MoonPhasePage />} />
        <Route path="/appointments" element={<AppointmentList appointments={appointments} deleteAppointment={deleteAppointment} updateAppointment={updateAppointment} users={users} hairstyles={hairstyles} stylists={stylists} />} />
        <Route path="/appointments/new" element={<AppointmentForm addAppointment={addAppointment} users={users} hairstyles={hairstyles} stylists={stylists} />} />
        <Route path="/appointments/:id" element={<AppointmentDetail />} />   
        <Route path="/appointments/edit/:id" element={<EditAppointmentPage updateAppointment={updateAppointment} />} />     
        <Route path="/stylists" element={<Stylist />} />
        <Route path="/hairstyles" element={<Hairstyle />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/signup" element={<Signup onLogin={login} />} /> 
        <Route path="/users" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
//   return (
//     <Router>
//       {/* <div className="app">
//       <NavBar logout={logout}/>
//       <Outlet context={login}/> */}

//       <NavBar logout={logout} isLoggedIn={isLoggedIn} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/moon-phases" element={<MoonPhasePage />} />
//         <Route path="/appointments" element={<AppointmentList appointments={appointments} deleteAppointment={deleteAppointment} updateAppointment={updateAppointment} users={users} hairstyles={hairstyles} stylists={stylists}   />} />
//         <Route path="/appointments/new" element={<AppointmentForm addAppointment={addAppointment} users={users} 
//                 hairstyles={hairstyles} 
//                 stylists={stylists} />} />
//         <Route path="/appointments/:id" element={<AppointmentDetail />} />   
//         <Route path="/appointments/edit/:id" element={<EditAppointmentPage updateAppointment={updateAppointment} />} />     
//         <Route path="/stylists" element={<Stylist />} />
//         <Route path="/hairstyles" element={<Hairstyle />} />
//         <Route path="/login" element={<Login onLogin={login} />} />
//         <Route path="/signup" element={<Signup onLogin={login} />} /> 
//         <Route path="/users" element={<User />} />
//       </Routes>
//       {/* </div>   */}
//     </Router>
//   );
// }

// export default App;