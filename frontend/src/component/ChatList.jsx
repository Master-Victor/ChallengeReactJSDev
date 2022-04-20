import React, { useState } from 'react'

const ChatList = ({ responses, transcription, result }) => {

  const [ show, setShow ] = useState(false);

  return (
    <div>
      <label onClick={() => setShow(!show)}  style={{ cursor: 'pointer' }} > {`${ show ? 'Ocultar' : 'Ver'}`} Conversacion</label>
      <ul style={{ 'display': `${show ? 'block' : 'none'}` }}>
        {
          responses !== undefined &&
          responses.map( (y, i) =>
            <div key={y.time}>
              <li style={{ listStyle : 'none' }} > <strong>Bot:</strong> {y.text} </li>
              <li style={{ listStyle : 'none' }} > <strong>Cliente:</strong> { transcription[i] !== undefined ? transcription[i].text : result } </li>
            </div>
          )
        }
      </ul>
    </div>
  )
}

export default ChatList;