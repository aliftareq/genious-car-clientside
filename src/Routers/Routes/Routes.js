import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Login from "../../Pages/AuthenticationPage/LoginPage/Login";
import SignUp from "../../Pages/AuthenticationPage/SignUp/SignUp";
import CheckOut from "../../Pages/CheckOutPage/CheckOut";
import Home from "../../Pages/HomePage/Home";
import Orders from "../../Pages/Orders/Orders";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";

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
            {
                path: '/checkout/:id',
                loader: ({ params }) => fetch(`https://genious-car-server-with-jwt.vercel.app/services/${params.id}`),
                element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>
            },
            {
                path: '/orders',
                element: <PrivateRoute><Orders></Orders></PrivateRoute>
            },
        ]
    }
])