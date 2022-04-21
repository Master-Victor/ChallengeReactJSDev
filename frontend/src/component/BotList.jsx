import React, { useEffect, useState } from 'react';
import './CSS/list.css';
import ListActiveBots from './ListActiveBots';
import GestionList from './GestionList';
import { getBotList, getRangeDate } from '../store/features/clientSlice';
import { useDispatch, useSelector } from 'react-redux';

const BotList = ({ token }) => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const dispath = useDispatch();
    
    const botList = useSelector( store => store.client.botList );
    const searchResult = useSelector( store => store.client.search.results );
    const nextData = useSelector( store => store.client.search.next );
    const previusData = useSelector( store => store.client.search.previous );
    const idCliente = useSelector( store => store.client.clientID );

    const onChangeStart = (e) => {
        e.preventDefault();
        setStartDate(e.target.value);
    }
    const onChangeEnd = (e) => {
        e.preventDefault();
        setEndDate(e.target.value);
    }

    useEffect(() => {

        dispath( getBotList(token) );

    }, [token])

    const fetchRangeDate = async (url) => {

        dispath( getRangeDate( {token, url, idCliente, startDate, endDate} ) );

    }
    return (
        botList !== '' &&
        <>
            <h1 id="customers" > <strong>Lista de bots</strong> </h1>

            <ListActiveBots botList={botList} idCliente={idCliente} />

            <br />

            <h2 id="customers" >Lista de casos gestionados</h2>

            <div style={{ paddingLeft: '70vw' }} >
                Desde: &nbsp; <input type="date" name="start" onChange={onChangeStart} max={endDate} /> &nbsp;
                Hasta: &nbsp; <input type="date" name="end" onChange={onChangeEnd} min={startDate}/>
                <button onClick={() => fetchRangeDate()} >Buscar</button>
            </div>

            <br />

            <GestionList searchResult = { searchResult } />

            <div id="customers" >
                {previusData !== null && <button onClick={() => fetchRangeDate(previusData)} >Anterior</button>}
                {nextData !== null && <button onClick={() => fetchRangeDate(nextData)} >Siguiente</button>}
            </div>
        </>

    )
}

export default BotList