import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { todos, logger } from './middleware/HoloStore';
import { createStore, applyMiddleware } from 'redux';

import Archives from './components/Archives/Archives';
import Adventures from './components/Adventures/Adventures';
import Atlas from './components/Atlas/Atlas';
import Game from './components/Game/Game';
import Hanger from './components/Hanger/Hanger';

import Login from './components/Login/Login';
import MainMenu from './components/MainMenu/MainMenu';


import Notes from './components/Notes/Notes';
import Roller from './components/Roller/Roller';
import Roster from './components/Roster/Roster';

import { Router, Link } from "@reach/router"

const store = createStore(todos, ['Use Redux'], applyMiddleware(logger));  

//fontFamily: 'Engli-Besh',

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}

function App() {
  useEffect(()=>{    
    // window.document.documentElement.requestFullscreen();    
  },[])
    

  return (
    <Provider store={store}>      
        <Router>
          <Adventures path="adventures" />
          <Archives path="archives" />
          <Atlas path="atlas" />
          <Game path="game" />
          <Hanger path="hanger" />
          <Login path="/" />
          <MainMenu path="menu" />
          <Notes path="notes" />
          <Roller path="roller" />
          <Roster path="roster" />
        </Router>      
    </Provider>
  );
}

export default App;
