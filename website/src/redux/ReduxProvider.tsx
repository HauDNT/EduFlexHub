"use client"
import { Provider, useDispatch } from 'react-redux'
import store from '@/redux/store'
import React, { useEffect } from 'react'
import { getCookie } from '@/utils/cookieManage'
import { setReduxAuthToken } from '@/redux/authSlice'

const ReduxInitial = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        Promise
        .all([
            getCookie('userId'),
            getCookie('username'),
            getCookie('accessToken'),
        ])
        .then((values) => {
            const cookieData = {
                userId: values[0]?.value,
                username: values[1]?.value,
                accessToken: values[2]?.value,
            }

            if (cookieData) {
                dispatch(setReduxAuthToken(cookieData))
            }
        })
    }, [dispatch])

    return <></>
}

const ReduxProvider = ({ children } : { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <ReduxInitial/>
            {children}
        </Provider>
    )
}

export default ReduxProvider