import { FC } from 'react'
import { Flex, Layout } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
const { Header, } = Layout;

interface MenuItem {
    label: string,
    key: string,
    onClick?: () => void
}




const Navbar: FC = () => {
    const navigate = useNavigate()

    const isAuth = useTypedSelector(state => state.auth.isAuth)


    const loggedOutIems: MenuItem[] = [
        {
            label: 'Login',
            key: 'login',
        }
    ];

    const loggedInItems: MenuItem[] = [
        {
            label: 'Log out',
            key: 'logOut',
            onClick: () => { console.log('log out'); }
        }
    ];

    return (
        <Layout>
            <Header>
                <Flex justify='end' style={{ height: '100%' }}>
                    {isAuth && <div style={{ color: 'rgba(255, 255, 255, 0.65)' }}>My Name</div>}
                    <Menu theme='dark' selectable={false}
                        items={isAuth ? loggedInItems : loggedOutIems}
                        style={{ display: 'flex', alignItems: 'center' }}>
                    </Menu>
                </Flex>
            </Header>
        </Layout>
    )
}

export default Navbar