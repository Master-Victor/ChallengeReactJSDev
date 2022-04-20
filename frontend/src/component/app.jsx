import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BotList from './BotList';

const app = () => {
    const [token, setToken] = useState('asd');
    useEffect(() => {

        axios.post('https://admindev.inceptia.ai/api/v1/login/', {
            "email": "reactdev@iniceptia.ai",
            "password": "4eSBbHqiCTPdBCTj",
        })
            .then(function (response) {
                response.status === 200 && setToken(response.data.token);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    const search = window.location.search;
    const idCliente = Number( search.replace('?',' ') ) !== 0 
                        ? Number( search.replace('?',' ') ) 
                        : 28;

    return (
        <>
            {
                token !== '' 
                    ? <BotList token={token} idCliente={ idCliente }/>
                    : <h1>Loading..</h1>
            }
        </>

    )
}

export default app