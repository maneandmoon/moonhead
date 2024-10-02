import App from "./components/App";
import Home from './components/Home';
import User from './components/User';
import UserDetail from "./components/UserDetail";
import Stylist from'./components/Stylist';
import StylistDetail from './components/StylistDetail';
import AppointmentList from './components/AppointmentList';
import AppointmentForm from './components/AppointmentForm';
import AppointmentDetail from './components/AppointmentDetail';
import EditAppointment from "./components/EditAppointment";
import Signup from './components/Signup';
import Login from './components/Login';
import Hairstyle from './components/Hairstyle';
import MoonPhasePage from './components/MoonPhasePage';

const routes = [
    {
    path: "/",
    element: <App />,
    
    children: [{
        path: "/",
        element: <Home />
    },
    
    {
        path: "/users",
        element: <User />
    },
    
    {
        path: "/users/:id",
        element: <UserDetail />
    },

    {
        path: "/appointments",
        element: <AppointmentList /> 
    },
    
    {
        path: "/appointments/new",
        element: <AppointmentForm />
    },
    
    {
        path: "/appointments/:id", 
        element: <AppointmentDetail />
    },
   
    {
        path: "/appointments/edit/:id", 
        element: <EditAppointment /> 
    },
    
    {
        path: "/hairstyles",
        element: <Hairstyle />
    },    
    
    {
        path: "/stylists",
        element: <Stylist />
    },  
    
    {
        path: "/stylists/:id",
        element: <StylistDetail />
    }, 
    
    {
        path: "/login",
        element: <Login />
    },
    
    {
        path: "/signup",
        element: <Signup />
    },
    
    {
        path: "/moon-phases",
        element: <MoonPhasePage />
    }]
    
    }
];


export default routes;