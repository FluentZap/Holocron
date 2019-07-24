import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import uuid from 'uuid';
import { styled } from '@material-ui/styles';
import Button from '../Button';


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
    // padding: 20,
    '&:before': {
        border: '1px solid #C7D7F1',
        backgroundColor: '#131435',
        filter: 'blur(1px)',
        width: '100px',
        height: '100px',
    },
    borderRadius: 10,
    margin: 0,
    width: 'calc(100vw - 20px)',
    height: 'calc(100vh - 20px)',
  },
})

const StyledButton = styled(TextField)({
  color: 'white',
  margin: '15px 15px',
  '& label, input': {
    color: 'white'
  }
})



function Games(props) {
  const classes = appStyles();
  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
      <Button width={64 * 1} height={64 * 1} text={'C'}/>
      {/* <Button variant="contained" color="primary" >Games</Button>
      <Button variant="contained" color="secondary" >Characters</Button>
      <Button variant="contained" color="primary" >Data Archives</Button> */}
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

export default connect(mapStateToProps)(Games);
