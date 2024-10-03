
import React, { lazy, Suspense, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
// import { AppointmentProvider, useAppointments } from './AppointmentContext';
import { AppointmentProvider } from './Appointments/AppointmentContext';
import { useAppointments } from './useAppointments'; // Import the custom hook

// Lazy load components
const Home = lazy(() => import("./Home"));
const MoonPhasePage = lazy(() => import("./Moonphase/MoonPhasePage"));
const AppointmentForm = lazy(() => import("./Appointments/AppointmentForm"));
const AppointmentList = lazy(() => import("./Appointments/AppointmentList"));
const AppointmentDetail = lazy(() => import("./Appointments/AppointmentDetail"));
const EditAppointment = lazy(() => import("./Appointments/EditAppointment"));
const Hairstyle = lazy(() => import("./Hairstyle/Hairstyle"));
const Stylist = lazy(() => import("./Stylist/Stylist"));
const StylistDetail = lazy(() => import("./Stylist/StylistDetail"));
const Login = lazy(() => import("./Login/Login"));
const Signup = lazy(() => import("./Signup/Signup"));
const User = lazy(() => import("./User/User"));
const UserDetail = lazy(() => import("./User/UserDetail"));

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

    const addUser = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
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
                    <Route path="/appointments/edit/:id" element={<EditAppointment />} />     
                    <Route path="/stylists" element={<Stylist />} />
                    <Route path="/stylists/:id" element={<StylistDetail />} />
                    <Route path="/hairstyles" element={<Hairstyle />} />
                    <Route path="/login" element={<Login onLogin={login} />} />
                    <Route path="/signup" element={<Signup onLogin={login} addUser={addUser} />} /> 
                    <Route path="/users" element={<User />} />
                    <Route path="/users/:id" element={<UserDetail />} />
                </Routes>
            </Suspense>
        </AppointmentProvider>
    );
}

export default App;