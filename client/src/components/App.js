
import React, { lazy, Suspense, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
// import { AppointmentProvider, useAppointments } from './AppointmentContext';
import { AppointmentProvider } from './AppointmentContext';
import { useAppointments } from './useAppointments'; // Import the custom hook

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
    const [users, setUsers] = useState([]);
    const [hairstyles, setHairstyles] = useState([]);
    const [stylists, setStylists] = useState([]);
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

    // Fetch users
    React.useEffect(() => {
        fetch("http://127.0.0.1:5555/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    // Fetch hairstyles
    React.useEffect(() => {
        fetch("http://127.0.0.1:5555/hairstyles")
            .then(res => res.json())
            .then(data => setHairstyles(data))
            .catch(err => console.error(err));
    }, []);

    // Fetch stylists
    React.useEffect(() => {
        fetch("http://127.0.0.1:5555/stylists")
            .then(res => res.json())
            .then(data => setStylists(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <AppointmentProvider>
            <NavBar logout={logout} isLoggedIn={isLoggedIn} />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/moon-phases" element={<MoonPhasePage />} />
                    <Route path="/appointments" 
                        element={
                            <AppointmentList 
                                users={users} 
                                hairstyles={hairstyles} 
                                stylists={stylists} 
                            />} 
                    />
                    <Route path="/appointments/new" 
                        element={
                            <AppointmentForm 
                                users={users} 
                                hairstyles={hairstyles} 
                                stylists={stylists} 
                            />} 
                    />
                    <Route path="/appointments/:id" element={<AppointmentDetail />} />   
                    <Route path="/appointments/edit/:id" element={<EditAppointmentPage />} />     
                    <Route path="/stylists" element={<Stylist />} />
                    <Route path="/hairstyles" element={<Hairstyle />} />
                    <Route path="/login" element={<Login onLogin={login} />} />
                    <Route path="/signup" element={<Signup onLogin={login} />} /> 
                    <Route path="/users" element={<User />} />
                </Routes>
            </Suspense>
        </AppointmentProvider>
    );
}

export default App;