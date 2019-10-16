import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid';
import { Link, navigate } from "@reach/router";
import './LoginStyles.css';

function Login(props) {
  const { dispatch } = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');  
  

  const AddUser = () => {    
    dispatch({ type: 'SERVER_CREATE_USER', userName: userName, password: password });
  }

  const LoginUser = () => {
    dispatch({ type: 'SERVER_LOGIN_USER', userName: userName, password: password });
  }

  return (
    <div className='flex-center login-root'>
      <div className='login-container'>
        <div className='flex-center login-heading' style={{ gridArea: '11 / 4 / span 3 / span 14' }} >HoloCron</div>
        <input className='login-input m2 p2' style={{ gridArea: '16 / 4 / span 3 / span 14'}} placeholder={'Username'} type="text" onChange={event => setUserName(event.target.value)} />
        <input onKeyUp={event => {
          if (event.key === 'Enter') {
            LoginUser();
          }
        }
        } className='login-input m2 p2' style={{ gridArea: '20 / 4 / span 3 / span 14' }} placeholder={'Password'} type="password" onChange={event => setPassword(event.target.value)} />
        {userName === '' || password === '' ?
          <>
            <button className='flex-center data-panel disabled m2 p2' style={{ gridArea: '27 / 2 / span 4 / span 9', fontSize: '4vh' }}>Login</button>
            <button className='flex-center data-panel disabled m2 p2' style={{ gridArea: '27 / 11 / span 4 / span 9', fontSize: '4vh' }}>Register</button>
          </>
          :
          <>
            <button onClick={LoginUser} className='flex-center data-panel red-glow m2 p2' style={{ gridArea: '27 / 2 / span 4 / span 9', fontSize: '4vh' }}>Login</button>
            <button onClick={AddUser} className='flex-center data-panel red-glow m2 p2' style={{ gridArea: '27 / 11 / span 4 / span 9', fontSize: '4vh' }}>Register</button>
          </>
        }
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    messages: state
  };
}

export default connect(mapStateToProps)(Login);
