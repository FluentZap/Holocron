import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid';
import { Link, navigate } from "@reach/router";
import './LoginStyles.css';
import { CreateServerAction, Action, CreateAction } from '../../middleware/ActionBuilder';

function Login({ dispatch, sessionToken }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [rejectLogin, setRejectLogin] = useState('');

  useEffect(() => {
    if (sessionToken === "rejected") {
      setRejectLogin("reject-animation");
      dispatch(CreateAction(Action.SetSessionToken, { sessionToken: null }));
    }
  }, [sessionToken, dispatch]);

  const AddUser = () => {
    dispatch(CreateServerAction(Action.CreateUser, { userName: userName, password: password }));
  }

  const LoginUser = () => {
    dispatch(CreateServerAction(Action.LoginUser, { userName: userName, password: password }));
  }

  return (
    <div className='flex-center login-root'>
      <div className='login-container'>
        {/* <div className="lds-dual-ring" style={{ gridArea: '1 / 1 / span 64 / span 36' }}/> */}
        <div className={`flex-center login-background`} style={{ gridArea: '1 / 1 / span 64 / span 36' }} />
        <div className='flex-center login-heading' style={{ gridArea: '17 / 4 / span 5 / span 30' }} >HoloCron</div>
        <input className={`${rejectLogin} login-input m2 p2`} style={{ gridArea: '25 / 6 / span 6 / span 26' }} placeholder={'Username'} type="text" onChange={event => setUserName(event.target.value)} />
        <input onKeyUp={event => {
          if (event.key === 'Enter') {
            LoginUser();
          }
        }
        }
          onAnimationEnd={() => setRejectLogin('')}
          className={`${rejectLogin} login-input m2 p2`} style={{ gridArea: '32 / 6 / span 6 / span 26' }} placeholder={'Password'} type="password" onChange={event => setPassword(event.target.value)} />
        <button onClick={LoginUser} className={`flex-center data-panel red-glow m2 p2`} style={{ gridArea: '42 / 6 / span 6 / span 13', fontSize: '4vh' }}>Login</button>
        <button onClick={AddUser} className={`flex-center data-panel red-glow m2 p2`} style={{ gridArea: '42 / 19 / span 6 / span 13', fontSize: '4vh' }}>Register</button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    sessionToken: state.user.sessionToken
  };
}

export default connect(mapStateToProps)(Login);
