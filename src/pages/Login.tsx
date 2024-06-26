import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { RouteNames } from '../routes/Routes'
import { useTypedSelector } from '../hooks/useTypedSelector'
import LoginForm from '../components/LoginForm'
import { Flex, Layout, Card } from 'antd';
import "../App.css";


export const Login: FC = () => {
    const isAuth = useTypedSelector(state => state.auth.isAuth)

    if (isAuth) { return <Navigate to={RouteNames.EVENT} /> }

    return (
        <Layout>
            <Flex justify='center' align='center' className='h100'>
                <Card><LoginForm /></Card> 
            </Flex>
        </Layout>
    )
}
