'use client'
import React from 'react';
import { Button, Divider, Form, Input, Typography } from 'antd';
import styles from './login.module.scss';
import { FacebookFilled, GithubFilled, GoogleOutlined } from '@ant-design/icons';

const Login: React.FC = () => {
    return (
        <div className={styles.container}>
            <Form className={styles.form}>
                <Typography.Title className={styles.formHeader}>Sign in</Typography.Title>
                <Form.Item label='Username' name={'username'}>
                    <Input placeholder='Enter your username'/>
                </Form.Item>
                <Form.Item label='Password' name={'password'}>
                    <Input placeholder='Enter your password' />
                </Form.Item>
                <Button type='primary' htmlType='submit' block>Sign in</Button>
                <Divider className={styles.formDivider}>or Sign in with</Divider>
                <div className={styles.socialLoginContainer}>
                    <GoogleOutlined className={styles.socialLoginIcon} />
                    <FacebookFilled className={styles.socialLoginIcon} />
                    <GithubFilled className={styles.socialLoginIcon} />
                </div>
            </Form>
        </div>
    )
}

export default Login;
