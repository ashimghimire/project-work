import React, { useEffect, useState } from 'react';
const { socket } = require("./socket");
const cryptoJs= require("crypto-js");
const {key}=require("./config");

const Chatter = () => {
    const [message,setMessage]=useState('');
    const [listMessage,setListMessage]=useState([]);
    const handleClick=(e)=>{
        
        const ecryptedMessage=cryptoJs.AES.encrypt(message,key).toString();
        socket.timeout(5000).emit('chat_message',ecryptedMessage, () => {
            setMessage('');
          });
    }

    const handleChange=(e)=>{
        setMessage(e.target.value);
    }

    useEffect(()=>{
        const handleIncomingMessage=(arg)=>{
           console.log("--------------", arg);
            let decryptedMessage=cryptoJs.AES.decrypt(arg,key);
            // eslint-disable-next-line no-undef, no-const-assign
            decryptedMessage= decryptedMessage.toString(cryptoJs.enc.Utf8);
            const newArray2 = listMessage.concat(decryptedMessage);
            setListMessage(newArray2);
            
        }
        socket.on('chat_message', handleIncomingMessage);
        
    },[]);

    return (
      
<div className="wrapper">
  
  <div className="container">
    <div className="right">
      <div className="top">
        <span>
           <span className="name">Chatter</span>
        </span>
      </div>
      <div className="chat mt-2 d-block border-0">
       
        {listMessage.map((list,index)=>  <div key={index} className="bubble you">{list}</div>)}
      </div>
      <div className="write">
        <a href="javascript:;" className="write-link attach"></a>
        <input type="text" name="message" value={message} onChange={(e)=>handleChange(e)} />
        <a href="javascript:;" className="write-link smiley"></a>
        <a href="javascript:;" className="write-link send" onClick={(e)=>handleClick(e)} ></a>
      </div>
    </div>
  </div>
</div>
    );
};

export default Chatter;