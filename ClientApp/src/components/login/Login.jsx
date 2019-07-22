import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'

const appStyles = makeStyles({
  root: {
    // backgroundColor: '#0a0a12',
    '& h1': {
      fontFamily: 'Engli-Besh, Times, serif',
      // fontFamily: 'Teuton',
      //fontFamily: 'Symbol, Times, serif',      
    }
  },
})



function Login(props) {
  const classes = appStyles();
  return (
    <div className={classes.root}>
      {props.messages.map(m => (
        <h1>{m}</h1>
      )
      )}
    </div>
  );
}


function mapStateToProps(state) {
  return {
    messages: state
  };
}

export default connect(mapStateToProps)(Login);
