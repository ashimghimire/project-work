import React, { useState } from 'react';
import Chatter from './Chatter';
import axios from 'axios';
const Login = () => {

    const [userName,setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [isLoggedIn, setLogin]=useState(false);

    const handleChange=(e, type)=>{
        if(type=='username')
        setUsername(e.target.value);
        else if(type='password'){
            setPassword(e.target.value);
        }
    }

    const loginUser = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "username": userName,
          "password": password
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3001/login", requestOptions)
          .then(response => response.json())
          .then(result => { if(result.token) setLogin(true)})
          .catch(error => console.log('error', error));
      };


    return (
        <>
       {!isLoggedIn && <div style={{marginTop:'30vh'}}>
            <div className='row'>
                <div className="col-sm-4 offset-sm-4 card">
                    <h3>Login</h3>
                    <form>
                        <div className='form-group mt-2'>
                            <input className='form-control' placeholder='username' onChange={(e)=>handleChange(e,'username')} type="text" name="username"></input>
                        </div>
                        <div className='form-group mt-2'>
                            <input className='form-control' placeholder="password" onChange={(e)=>handleChange(e,'password')} type='text' name="password"></input>
                        </div>
                        <div className='form-group mt-2'>
                            <input className='form-control btn btn-primary' type='button' value="login" onClick={()=>loginUser()}></input>
                        </div>
                    </form>
                </div>
            </div>
            
        </div> }
        {isLoggedIn && <><Chatter/></>}
        </>
    );
};

export default Login;