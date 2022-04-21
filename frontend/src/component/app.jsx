import React, { useEffect } from 'react'
import BotList from './BotList';
import { login } from '../store/features/clientSlice';
import {useDispatch, useSelector} from 'react-redux';
const app = () => {

    const dispatch = useDispatch();
    const tokenRedux = useSelector( store => store.client.token );

    useEffect(() => {

        dispatch( login() );

    }, [])

    return (
        <>
            {
                tokenRedux !== '' 
                    ? <BotList token={tokenRedux}/>
                    : <h1>Loading..</h1>
            }
        </>

    )
}

export default app