import React, { useState, useEffect } from 'react';
import { makeStyles, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import uuid from 'uuid';
import { styled } from '@material-ui/styles';

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
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#334',
    borderRadius: 10,
  },
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
  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <StyledInput
          label="Username"
          className={classes.textField}
        />
        <StyledInput
          type="password"
          label="Password"
          className={classes.textField}
        />
        <Button variant="contained" color="primary">
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
