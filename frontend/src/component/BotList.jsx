import React, { useEffect, useState } from 'react';
import './CSS/list.css';
import axios from 'axios';
import NavBar from './NavBar';
import ListActiveBots from './ListActiveBots';
import GestionList from './GestionList';
const BotList = ({ token, idCliente }) => {

    const [dataList, setDataList] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchResult, setSearchResult] = useState('');
    const [nextData, setNextData] = useState(null);
    const [previusData, setPreviusData] = useState(null);

    const onChangeStart = (e) => {
        e.preventDefault();
        setStartDate(e.target.value);
    }
    const onChangeEnd = (e) => {
        e.preventDefault();
        setEndDate(e.target.value);
    }

    useEffect(() => {

        const fetchData = async () => {
            const res = await axios.get('https://admindev.inceptia.ai/api/v1/clients/', {
                headers: { "authorization": `JWT ${token}` }
            })
            setDataList(res.data);
        }
        fetchData()
            .catch(console.error);;

    }, [token])

    const fetchRangeDate = async (url) => {
        const requestURL = url === undefined ? `https://admindev.inceptia.ai/api/v1/inbound-case/?client=${idCliente !== 0 ? idCliente : '28'}&local_updated__date__gte=${startDate}&local_updated__date__lte=${endDate}`
            : url
        if (startDate !== null && endDate !== null) {
            const res = await axios.get(requestURL, {
                headers: { "authorization": `JWT ${token}` }
            })
            res.status === 200 && setSearchResult(res.data.results);
            res.status === 200 && setNextData(res.data.next);
            res.status === 200 && setPreviusData(res.data.previous);
        }
    }
    return (
        dataList !== '' &&
        <>
            <NavBar clientBots={dataList.map(x => { return { "name": x.name, "id": x.id } })} />

            <h1 id="customers" > <strong>Lista de bots</strong> </h1>

            <ListActiveBots botList={dataList} idCliente={idCliente} />

            <br />

            <h2 id="customers" >Lista de casos gestionados</h2>

            <div style={{ paddingLeft: '70vw' }} >
                Desde: &nbsp; <input type="date" name="start" id="" onChange={onChangeStart} max={endDate} /> &nbsp;
                Hasta: &nbsp; <input type="date" name="end" id="" onChange={onChangeEnd} min={startDate}/>
                <button onClick={() => fetchRangeDate()} >Buscar</button>
            </div>

            <br />

            <GestionList searchResult={searchResult} />

            <div id="customers" >
                {previusData !== null && <button onClick={() => fetchRangeDate(previusData)} >Anterior</button>}
                {nextData !== null && <button onClick={() => fetchRangeDate(nextData)} >Siguiente</button>}
            </div>
        </>

    )
}

export default BotList