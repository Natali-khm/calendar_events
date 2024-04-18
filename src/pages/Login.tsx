import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { RouteNames } from '../routes/Routes'

export const Login: FC = () => {
    const isAuth = false
    if (isAuth) { return <Navigate to={RouteNames.EVENT} /> }
    return (
        <div>Login</div>
    )
}
