import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

// Lazy load components
const Home = lazy(() => import("./Home"));
const MoonPhasePage = lazy(() => import("./MoonPhasePage"));
const AppointmentForm = lazy(() => import("./AppointmentForm"));
const AppointmentList = lazy(() => import("./AppointmentList"));
const AppointmentDetail = lazy(() => import("./AppointmentDetail"));
const EditAppointmentPage = lazy(() => import("./EditAppointmentPage"));
const Hairstyle = lazy(() => import("./Hairstyle"));
const Stylist = lazy(() => import("./Stylist"));
const Login = lazy(() => import("./Login"));
const Signup = lazy(() => import("./Signup"));
const User = lazy(() => import("./User"));

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
        })
        .catch((error) => {
          console.error(error);
          alert('Failed to update appointment.'); // Alert on failure
        });
    };

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

    return (
      <>
        <NavBar logout={logout} isLoggedIn={isLoggedIn} />
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </>
    );
}

export default App;
