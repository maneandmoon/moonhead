import App from "./components/App";
import Home from './components/Home';
import User from './components/User';
import Appointment from './components/Appointment';
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
        path: "/user",
        element: <User />
    },
    {
        path: "/appointment",
        element: <Appointment />
    },
    {
        path: "/hairstyle",
        element: <Hairstyle />
    },    
    {
        path: "/stylist",
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
        path: "/moonphase",
        element: <MoonPhasePage />
    }]
    }
];


export default routes;