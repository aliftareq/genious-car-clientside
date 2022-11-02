import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Login from "../../Pages/AuthenticationPage/LoginPage/Login";
import SignUp from "../../Pages/AuthenticationPage/SignUp/SignUp";
import Home from "../../Pages/HomePage/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <SignUp></SignUp>
            },
        ]
    }
])