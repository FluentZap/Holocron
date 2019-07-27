import React, { useState, useEffect } from 'react';
import { makeStyles, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import uuid from 'uuid';
import { styled } from '@material-ui/styles';
import HButton from '../HButton';
import BackgroundSVG from '../../background.svg';

const appStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#0a0a12',
    '& h1': {
      fontFamily: 'Engli-Besh, Times, serif',
      // fontFamily: 'Teuton',
      //fontFamily: 'Symbol, Times, serif',      
    }
  },
  loginContainer: {
    // '&:before': {
    //   height: '100%',
    //   width: '100%',
    //   top: 0,
    //   left: 0,
    //   position: 'absolute',
    //   border: '4px solid #fafef9',
    //   filter: 'drop-shadow(0px 0px 1px #fafef9)',
    //   content: '""',
    // },
    display: 'flex',
    position: 'relative',
    padding: '30px 60px 10px',
    flexDirection: 'column',
    background: `url(${BackgroundSVG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '80vmin',
    height: '80vmin',
    maxWidth: 600,
    maxHeight: 600,
    boxSizing: 'border-box',
    // margin: 20
    // backgroundColor: '#334',
    // borderRadius: 10,
    '& h1': {
      fontFamily: 'Engli-Besh, Times, serif',
      fontSize: '10vmin'
    }
  },
  inputBox: {    
    fontFamily: 'monospace',
    cursor: 'pointer',
    height: 40,
    background: '#432a52',
    border: '2px solid blueviolet',
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    '&:focus': {
      border: '2px solid blueviolet',
      outline: 'none'
    }
  }
})

const StyledInput = styled(TextField)({
  color: 'white',
  margin: '15px 15px',
  '& label, input': {
    color: 'white'
  }
})



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
        <h1>Holocron</h1>
        <HButton text={'H'} />
        <input className={classes.inputBox} type="text" name="" id="" />
        <input className={classes.inputBox} type="password" name="" id="" />
        <Button variant="contained" color="primary" onClick={AddUser}>
          Login
        </Button>
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
