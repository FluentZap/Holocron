import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { holocronMiddleware, holocronReducer, initial_state } from './middleware/HoloStore';
import { createStore, applyMiddleware } from 'redux';

import Archives from './components/Archives/Archives';
import ChangeAdventures from './components/Adventures/ChangeAdventures';

import Atlas from './components/Atlas/Atlas';
import Game from './components/Game/Game';
import Hanger from './components/Hanger/Hanger';

import Login from './components/Login/Login';
import MainMenu from './components/MainMenu/MainMenu';

import Notes from './components/Notes/Notes';
import Roller from './components/Roller/Roller';
import Roster from './components/Roster/Roster';

import { Router, Link, Redirect } from "@reach/router"
import PrivateRoute from './components/PrivateRoute';
import RosterCreateNew from './components/Roster/RosterCreateNew/RosterCreateNew';
import AdventureMenu from './components/Adventures/AdventureMenu/AdventureMenu';
import Play from './components/Adventures/Play/Play';
import Inventory from './components/Adventures/Inventory/Inventory';
import logger from 'redux-logger'
import AddCharacter from './components/Adventures/AddCharacter/AddCharacter';

const store = createStore(holocronReducer, initial_state, applyMiddleware(holocronMiddleware, logger));

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

window.addEventListener('resize', () => {
  // We execute the same script as before
  // let vh = window.innerHeight * 0.01;
  // document.documentElement.style.setProperty('--unit', `${vh}px`);
  // document.documentElement.style.setProperty('--width', `${vh}px`);
});

function App() {
  useEffect(() => {
    // window.document.documentElement.requestFullscreen();
  }, [])


  return (
    <Provider store={store}>
      <Router>
        <Login path="/" default />
        {/* <Roster path="/" default/> */}
        <PrivateRoute Component={ChangeAdventures} path="changeadventures" />
        <PrivateRoute Component={AdventureMenu} path="adventure" />
        <PrivateRoute Component={Archives} path="archives" />
        <PrivateRoute Component={Atlas} path="atlas" />
        <PrivateRoute Component={Game} path="game" />
        <PrivateRoute Component={Hanger} path="hanger" />
        <PrivateRoute Component={MainMenu} path="menu" />
        <PrivateRoute Component={Notes} path="notes" />
        <PrivateRoute Component={Roller} path="roller" />
        <PrivateRoute Component={Roster} path="roster" />
        <PrivateRoute Component={RosterCreateNew} path="createnew" />

        <PrivateRoute Component={Play} path="adventure/play" />
        <PrivateRoute Component={Inventory} path="adventure/inventory" />
        <PrivateRoute Component={AddCharacter} path="/adventure/addcharacter" />
        {/* <PrivateRoute Component={RosterCreateNew} path="adventure/" /> */}
        {/* <PrivateRoute Component={RosterCreateNew} path="adventure/" /> */}
        {/* <PrivateRoute Component={RosterCreateNew} path="adventure/" /> */}
      </Router>
    </Provider>
  );
}

export default App;
