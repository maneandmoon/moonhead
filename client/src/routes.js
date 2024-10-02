import App from "./components/App";
import Home from './components/Home';
import User from './components/User';
import Stylist from'./components/Stylist';
import AppointmentList from './components/AppointmentList';
import AppointmentForm from './components/AppointmentForm';
import AppointmentDetail from './components/AppointmentDetail';
import EditAppointmentPage from "./components/EditAppointmentPage";
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
        element: <EditAppointmentPage /> 
        // updateAppointment={updateAppointment} 
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