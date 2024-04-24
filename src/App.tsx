import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Layout, Progress } from 'antd';
import { useTypedDispatch } from './hooks/useTypedDispatch';
import { authAction } from './store/reducers/auth.slice';
import { IUser } from './models/IUser';
import { useTypedSelector } from './hooks/useTypedSelector';
const { Content } = Layout;

const App: FC = () => {
  const dispatch = useTypedDispatch()

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch(authAction.setAuth(true))
      dispatch(authAction.setUserData({ username: localStorage.getItem('username' || '') } as IUser))
    }
  }, [])

  return (
    <Layout>
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default App