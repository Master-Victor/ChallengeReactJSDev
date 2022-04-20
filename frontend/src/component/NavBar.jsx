import React from 'react'
const NavBar = ( { clientBots } ) => {
    return (
        <aside style={ {"position":"fixed","width":"10%","height":"100vh","background":"#EED1FF","fontSize":"1vh"} }>
            <nav style={ {"position":"relative","margin":"0 10%","textAlign":"right", "fontFamily": "Arial, Helvetica, sans-serif"} } >
                <h2 style={ {color: 'grey'} }  >Cliente</h2>
                <ul style={{ 'listStyle': 'none' }} >
                    {
                        clientBots.map( (bot, i )=> <li key = { i } ><a style={ {"lineHeight":"5em","textTransform":"uppercase","textDecoration":"none","display":"block","transition":"all ease-out 300ms", 'color': 'black'} }  href={`?${bot.id}`} > {bot.name} </a></li> )
                    }
                </ul>
            </nav>
        </aside>
    )
}

export default NavBar