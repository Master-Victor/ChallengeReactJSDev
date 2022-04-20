import React, { useEffect, useState } from 'react';
import './CSS/list.css';
import axios from 'axios';
import NavBar from './NavBar';
import ChatList from './ChatList'

const BotList = ({ token, idCliente }) => {

    const [dataList, setDataList] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
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
            <span> <strong>Lista de bots</strong> </span>
            <table id="customers">
                <tbody>
                    <tr>
                        <th> ID </th>
                        <th> Email </th>
                        <th> First name </th>
                        <th> Last name </th>
                        <th> Profile Image </th>
                        <th> # Groups </th>
                        <th> Active </th>
                    </tr>
                    {
                        dataList.map(x => (x.id === idCliente) && x.users.map(list =>
                            <tr key={list.id}>
                                <td>{list.id}</td>
                                <td> {list.email} </td>
                                <td> {list.first_name} </td>
                                <td> {list.last_name} </td>
                                <td> {list.profile_image} </td>
                                <td> {list.groups.length} </td>
                                <td> {list.is_active ? 'true' : 'false'} </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <br />
            <h2 id="customers" >Lista de casos gestionados</h2>
            <div style={{ paddingLeft: '70vw' }} >
                Desde: &nbsp; <input type="date" name="start" id="" onChange={onChangeStart} /> &nbsp;
                Hasta: &nbsp; <input type="date" name="end" id="" onChange={onChangeEnd} />
                <button onClick={() => fetchRangeDate()} >Buscar</button>
            </div>
            <br />
            <table id="customers">
                <tbody>
                    <tr>
                        <th> Gestionado </th>
                        <th> ID Caso </th>
                        <th> Telefono </th>
                        <th> DNI </th>
                        <th> Grupo </th>
                        <th> Llamada </th>
                        <th> Estado </th>
                        <th> Conversacion </th>
                    </tr>
                    {
                        ((searchResult !== '')) ? searchResult.map(x => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.last_updated}</td>
                                    <td> {x.case_uuid} </td>
                                    <td> {x.phone} </td>
                                    <td> {x.extra_metadata.dni} </td>
                                    <td> {x.extra_metadata.grupo} </td>
                                    <td> {x.case_duration} </td>
                                    <td> {x.case_result.name} </td>
                                    <td>
                                        <ChatList responses={x.case_log.responses} transcription={x.case_log.transcription} result={x.case_result.name} />
                                    </td>
                                </tr>
                            )
                        })
                            : <tr><td>Seleccione intervalo de fechas...</td></tr>
                    }
                </tbody>
            </table>
            <div style={{ marginLeft: '12vw' }} >
                {previusData !== null && <button onClick={() => fetchRangeDate(previusData)} >Anterior</button>}
                {nextData !== null && <button onClick={() => fetchRangeDate(nextData)} >Siguiente</button>}
            </div>
        </>

    )
}

export default BotList