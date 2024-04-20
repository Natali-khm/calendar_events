import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { RouteNames } from '../routes/Routes'
import { useTypedSelector } from '../hooks/useTypedSelector'

export const Login: FC = () => {
    const isAuth = useTypedSelector(state => state.auth.isAuth)
    console.log(isAuth);
    
    if (isAuth) { return <Navigate to={RouteNames.EVENT} /> }
    return (
        <div>Login</div>
    )
}
