import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import uuid from 'uuid';
import BackgroundSVG from '../../background.svg';
import { Link, navigate } from "@reach/router"

const appStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',    
    '& h1': {
      fontFamily: 'Engli-Besh, Times, serif',      
    }
  },
  loginContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateRows: 'repeat(12, 1fr)',
    flexDirection: 'column',
    background: `url(${BackgroundSVG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    maxWidth: 600,
    maxHeight: 600,
    width: '80vmin',
    height: '80vmin',
    boxSizing: 'border-box',
    padding: '5% 8% 2%',
    ['@media (min-width:750px) and (min-height:750px)']: { // eslint-disable-line no-useless-computed-key
      padding: '37.5px 60px 15px',
    },
  },
  heading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gridColumn: '1 / span 12',
    gridRow: '1 / span 3',
    textAlign: 'center',
    fontFamily: 'Engli-Besh, Times, serif',
    userSelect: 'none',
    fontSize: '8vmin',
    ['@media (min-width:750px) and (min-height:750px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '60px'
    },
  },
  inputBox: {
    fontFamily: 'SymbolBold',
    cursor: 'pointer',
    height: '100%',    
    background: 'none',
    boxShadow: '0px 0px 5px #c72f2f',
    border: '2px solid #c72f2f',
    borderRadius: 5,    
    fontSize: '4vmin',
    ['@media (min-width:750px) and (min-height:750px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '30px'
    },
    textAlign: 'center',
    color: '#37a2cc',
    boxSizing: 'border-box',
    userSelect: 'none',
    '&:focus': {
      border: '2px solid #e07b7b',
      boxShadow: '0px 0px 8px #e07b7b',
      outline: 'none'
    },
    '&::placeholder': {
      color: '#26434e'
    }
  },

  button: {
    border: '2px solid #c72f2f',
    borderRadius: 5,
    fontFamily: 'Teuton',    
    fontSize: '4vmin',
    ['@media (min-width:750px) and (min-height:750px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '30px'
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    boxSizing: 'border-box',
    // margin: 10,
    backgroundColor: '#671818',
    boxShadow: '0px 0px 5px #671818',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: '#912222',
      border: '2px solid #e07b7b',
      boxShadow: '0px 0px 8px #e07b7b',
    },
    '&:focus': {
      border: '2px solid #e07b7b',
      boxShadow: '0px 0px 8px #e07b7b',
      outline: 'none'
    }
  },


  userNameInput:{
    gridColumn: '2 / span 10',
    gridRow: '4 / span 2',
  },
  passwordInput:{
    gridColumn: '2 / span 10',
    gridRow: '7 / span 2',
  },
}))


function Login(props) {
  const classes = appStyles();
  const { dispatch } = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const AddUser = () => {
    dispatch({ type: 'SERVER_CREATE_USER', userName: userName, password: password });
  }

  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <div className={classes.heading}>HoloCron</div>
        <input className={`${classes.inputBox} ${classes.userNameInput}`} placeholder={'Username'} type="text" onChange={event => setUserName(event.target.value)} />
        <input className={`${classes.inputBox} ${classes.passwordInput}`} placeholder={'Password'} type="password" onChange={event => setPassword(event.target.value)} />
        <button onClick={() => navigate('/Game')} className={classes.button} style={{ gridArea: '10 / 2 / span 2 / span 4'}}>Login</button>
        <button onClick={AddUser} className={classes.button} style={{ gridArea: '10 / 8 / span 2 / span 4'}}>Register</button>
        {/* <Link to="Game">Invoices</Link> */}
        {/* {props.messages.map(m => (
        <h1 key={uuid.v4()}>{m}</h1>
      )
      )} */}
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
