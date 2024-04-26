import { Button, Form, Input } from 'antd';
import { rules } from '../utils/rules';
import { authThunks } from '../store/reducers/auth.slice';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { IUser } from '../models/IUser';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ChangeEvent, useState } from 'react';



const LoginForm = () => {
    const dispatch = useTypedDispatch()
    const isLoading = useTypedSelector(state => state.auth.isLoading)
    const error = useTypedSelector(state => state.auth.error)

    const [username, setUsername] = useState('user')
    const [password, setPassword] = useState('123')

    const submit = () => {
        dispatch(authThunks.login({ username, password }))
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={submit}
            autoComplete="off"
        >
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
            <Form.Item<IUser>
                label="Username"
                name="username"
                initialValue={username}
                rules={[rules.required('Please input your username!')]}
            >
                <Input value={username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                initialValue={password}
                rules={[rules.required('Please input your password!')]}
            >
                <Input.Password value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Log in
                </Button>
            </Form.Item>
        </Form >
    )
}

export default LoginForm