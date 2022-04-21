import React from 'react';
import './CSS/list.css';
const ListActiveBots = ({ botList, idCliente }) => {
    return (
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
                    botList.map(x => (x.id === idCliente) && x.users.map(list =>
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
    )
}

export default ListActiveBots