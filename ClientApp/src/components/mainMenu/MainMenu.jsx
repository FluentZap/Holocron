import React, { useState, useEffect } from 'react';
import { makeStyles, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import uuid from 'uuid';
import { styled } from '@material-ui/styles';
import './mainMenuStyles.css';

function MainMenu(props) {
  return (
    <div className='flex-center full-screen'>
      <div className='main-menu-root'>
        <svg viewBox="0 0 0.5625 1">
          <defs>
            {/* <clipPath id="myClip">
              <circle cx="100" cy="100" r="120" />
              <circle cx="60" cy="60" r="40" />
            </clipPath> */}
          </defs>
        </svg>


        <div className='main-menu-container'>
        <button className='flex-center login-button scanlines' style={{ gridArea: '2 / 1 / span 6 / span 4', margin: 5}}>Roster</button>
        
        <button className='flex-center login-button scanlines' style={{ gridArea: '2 / 5 / span 3 / span 5', margin: 5}}>Archives</button>
        <button className='flex-center login-button scanlines' style={{ gridArea: '5 / 5 / span 3 / span 5', margin: 5}}>Hanger</button>
        
        <button className='flex-center login-button scanlines' style={{ gridArea: '8 / 1 / span 3 / span 9', margin: 5}}>Adventures</button>
        
        <button className='flex-center login-button scanlines' style={{ gridArea: '11 / 1 / span 3 / span 5', margin: 5}}>Atlas</button>
        <button className='flex-center login-button scanlines' style={{ gridArea: '14 / 1 / span 3 / span 5', margin: 5}}>Notes</button>
        
        <button className='flex-center login-button scanlines' style={{ gridArea: '11 / 6 / span 6 / span 4', margin: 5}}>Dice Roller</button>
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
