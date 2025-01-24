"use client"
import {Provider, useDispatch} from 'react-redux'
import store from '@/redux/store'
import React, {useEffect} from 'react'
import {getCookie} from '@/utils/cookieManage'
import {setReduxAuthToken} from '@/redux/authSlice'

const ReduxInitial = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        Promise
            .all([
                getCookie('eduflexhub-authentication'),
            ])
            .then((values) => {
                if (values.length > 0 && values[0]?.value) {
                    console.log('Token values: ', values)

                    let valueParse;

                    if (values.length > 0 && values[0]?.value) {
                        valueParse = JSON.parse(values[0]?.value ?? 'Not found token');
                    }

                    if (valueParse) {
                        dispatch(setReduxAuthToken(valueParse))
                    }
                }
            })
    }, [dispatch])

    return <></>
}

const ReduxProvider = ({children}: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <ReduxInitial/>
            {children}
        </Provider>
    )
}

export default ReduxProvider