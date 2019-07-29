import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';
import Navbar from './components/navbar/Navbar';
import { SquareButtonSVG, HolocronSVG } from './SVG';
import TabBar from './components/TabBar';
import { Provider } from 'react-redux';
import { todos, logger } from './middleware/HoloStore';
import { createStore, applyMiddleware } from 'redux';
import Login from './components/login/Login';
import MainMenu from './components/mainMenu/MainMenu';
import { ThemeProvider } from '@material-ui/styles';
import Games from './components/games/Games';
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
            <Login path="/" />
            <Games path="game" />
            <MainMenu path="menu" />
          {/* <div className={classes.main}> */}
            {/* <Games/> */}

            {/* <h1 className="red-glow">Glowing!</h1> */}
            {/* <div className="glow"></div> */}
            {/* <TabBar/> */}
            {/* <Navbar/>    */}
            {/* <SVG width={400} fill="#49c" /> */}
            {/* <HolocronSVG/> */}
            {/* <SquareButtonSVG width={"128"} height={"128"} fill={"#ccc"} />       */}
          {/* </div> */}
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
