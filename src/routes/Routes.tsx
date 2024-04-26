import { Navigate, createHashRouter } from "react-router-dom";
import App from "../App";
import Event from "../pages/Event";
import { Login } from "../pages/Login";
import { useTypedSelector } from "../hooks/useTypedSelector";

export enum RouteNames {
    LOGIN = 'login',
    EVENT = '/'
}

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const isAuth = useTypedSelector(state => state.auth.isAuth)

    return isAuth ? children : <Navigate to={RouteNames.LOGIN} />
}

export const router = createHashRouter([
    {
        path: RouteNames.EVENT,
        element: <App />,
        children: [
            {
                path: RouteNames.LOGIN,
                element: <Login />,
            },
            {
                path: RouteNames.EVENT,
                element: <ProtectedRoute><Event /></ProtectedRoute>,
            },
            {
                path: '*',
                element: <ProtectedRoute><Login /></ProtectedRoute>,
            },

        ],
    },
])
