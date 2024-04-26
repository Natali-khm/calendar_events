import { FC } from 'react'
import { Flex, Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { authThunks } from '../store/reducers/auth.slice';
const { Header, } = Layout;

interface MenuItem {
    label: string,
    key: string,
    onClick?: () => void
}


const Navbar: FC = () => {
    const navigate = useNavigate()

    const isAuth = useTypedSelector(state => state.auth.isAuth)
    const username = useTypedSelector(state => state.auth.user?.username)
    const dispatch = useTypedDispatch()

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
            onClick: () => { dispatch(authThunks.logout()) }
        }
    ];

    return (
        <Layout>
            <Header>
                <Flex justify='end' style={{ height: '100%' }}>
                    {isAuth && <div style={{ color: 'rgba(255, 255, 255, 0.65)' }}>{username}</div>}
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