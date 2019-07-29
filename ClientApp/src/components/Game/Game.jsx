import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import uuid from 'uuid';
import { styled } from '@material-ui/styles';
import HButton from '../HButton';
import { NavMenuSVG } from '../../SVG';
import './GameStyles.css';

const StyledButton = styled(TextField)({
  color: 'white',
  margin: '15px 15px',
  '& label, input': {
    color: 'white'
  }
})



function Game(props) {  
  return (
    <div className='game-root'>
      {/* <div style={{ margin: 10 }}>
        <NavMenuSVG width={'100%'} />
      </div> */}
      <div className='game-container'>
        <HButton text={'C'} />
        <HButton text={'S'} />
        <HButton text={'I'} />
        <HButton text={'A'} />
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

export default connect(mapStateToProps)(Game);
