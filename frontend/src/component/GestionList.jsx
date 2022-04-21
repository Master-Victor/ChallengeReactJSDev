import React from 'react';
import './CSS/list.css';
import ChatList from './ChatList'
const GestionList = ( {searchResult} ) => {
    return (
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
    )
}

export default GestionList