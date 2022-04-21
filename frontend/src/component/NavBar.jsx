import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClientID } from '../store/features/clientSlice';

const NavBar = () => {

    const dispatch = useDispatch()
    const botList = useSelector(store => store.client.botList);
    const clientBots = botList.length > 0 ? botList.map(x => { return { "name": x.name, "id": x.id } }) : '';

    return (
        <aside style={{ "position": "fixed", "width": "10%", "height": "100vh", "background": "#EED1FF", "fontSize": "1vh" }}>
            <nav style={{ "position": "relative", "margin": "0 10%", "textAlign": "right", "fontFamily": "Arial, Helvetica, sans-serif" }} >
                <h2 style={{ color: 'grey' }}  >Cliente</h2>
                <ul style={{ 'listStyle': 'none' }} >
                    {
                        clientBots !== '' && clientBots.map((bot, i) =>
                            <li key={i} >
                                <div style={{ "lineHeight": "5em", "textTransform": "uppercase", "textDecoration": "none", "display": "block", "transition": "all ease-out 300ms", 'color': 'black', 'cursor': 'pointer' }} onClick={() => dispatch(setClientID(bot.id))} >
                                    {bot.name}
                                </div>
                            </li>)
                    }
                </ul>
            </nav>
        </aside>
    )
}

export default NavBar