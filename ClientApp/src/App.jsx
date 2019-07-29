import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';
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


import { ThemeProvider } from '@material-ui/styles';
import { Router, Link } from "@reach/router"

//fontFamily: 'Engli-Besh',

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#335'
    },
    secondary: {
      main: '#257'
    },
  },
});

const store = createStore(todos, ['Use Redux'], applyMiddleware(logger));

const appStyles = makeStyles({
  main: {
    // backgroundColor: '#0a0a12',
    '& h1': {
      // fontFamily: 'Alagard, Times, serif',
      // fontFamily: 'Teuton',
      //fontFamily: 'Symbol, Times, serif',      
    }
  },
})



function App() {
  const classes = appStyles();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Provider>
  );
}

export default App;
