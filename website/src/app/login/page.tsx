'use client'
import React, {useState} from 'react';
import {useRouter, redirect} from "next/navigation";
import { Button, Divider, Form, Input, Typography } from 'antd';
import { FacebookFilled, GithubFilled, GoogleOutlined } from '@ant-design/icons';
import axiosInstance from "@/utils/axiosInstance";
import LoginResponseInterface from "@/interfaces/LoginResponse";
import { setCookie } from "@/utils/cookieManager";
import styles from './login.module.scss';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
          const res = await axiosInstance
              .post<LoginResponseInterface>('/auth/login', {
                  "username": username,
                  "password": password,
              })
              .catch(error => alert(`Error + ${error}`));

          if (res.status === 201 && res.data.accessToken) {
              await setCookie('username', res.data.username);
              await setCookie('userId', res.data.userId);
              await setCookie('accessToken', res.data.accessToken);
          }
    };

    return (
        <div className={styles.container}>
            <Form className={styles.form} onFinish={handleLogin}>
                <Typography.Title className={styles.formHeader}>Sign in</Typography.Title>
                <Form.Item label='Username' name={'username'}>
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter your username'/>
                </Form.Item>
                <Form.Item label='Password' name={'password'}>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password' />
                </Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    block
                >Sign in</Button>
                <Divider className={styles.formDivider}>or Sign in with</Divider>
                <div className={styles.socialLoginContainer}>
                    <GoogleOutlined className={styles.socialLoginIcon} onClick={() => redirect(`${process.env.NEXT_PUBLIC_URL_SERVER}/auth/google`)} />
                    <FacebookFilled className={styles.socialLoginIcon} />
                    <GithubFilled className={styles.socialLoginIcon} />
                </div>
            </Form>
        </div>
    )
}

export default Login;
