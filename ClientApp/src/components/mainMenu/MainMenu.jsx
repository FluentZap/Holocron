import React, { useState, useEffect } from 'react';
import { makeStyles, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import uuid from 'uuid';
import { styled } from '@material-ui/styles';
import './mainMenuStyles.css';

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

const StyledButton = styled(TextField)({
  color: 'white',
  margin: '15px 15px',
  '& label, input': {
    color: 'white'
  }
})



function MainMenu(props) {
  const classes = appStyles();
  return (
    <div className='flex-center full-screen'>
      <div className='main-menu-root'>
        <svg viewBox="0 0 0.5625 1" />
        <div className='main-menu-container'>
          {/* <Button variant="contained" color="primary" >Games</Button> */}
          {/* <Button variant="contained" color="secondary" >Characters</Button> */}
          {/* <Button variant="contained" color="primary" >Data Archives</Button>       */}
          {/* {props.messages.map(m => (
        <h1 key={uuid.v4()}>{m}</h1>
      )
      )} */}
        </div>
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    messages: state
  };
}

export default connect(mapStateToProps)(MainMenu);
