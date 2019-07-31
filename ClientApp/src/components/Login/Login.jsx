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
        <div className='flex-center login-heading'>HoloCron</div>
        <input className='login-input' style={{ gridArea: '4 / 2 / span 2 / span 10' }} placeholder={'Username'} type="text" onChange={event => setUserName(event.target.value)} />
        <input className='login-input' style={{ gridArea: '7 / 2 / span 2 / span 10' }} placeholder={'Password'} type="password" onChange={event => setPassword(event.target.value)} />
        <button onClick={LoginUser} className='flex-center data-panel red-glow' style={{ gridArea: '10 / 2 / span 2 / span 4', fontSize: '4vmin'}}>Login</button>
        <button onClick={AddUser} className='flex-center data-panel red-glow' style={{ gridArea: '10 / 8 / span 2 / span 4', fontSize: '4vmin'}}>Register</button>        
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
