import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Layout } from 'antd';
const { Content } = Layout;

const App: FC = () => {
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