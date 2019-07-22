import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/styles';
import Navbar from './components/navbar/Navbar';
import { SquareButtonSVG, HolocronSVG } from './SVG';
import TabBar from './components/TabBar';
import { Provider } from 'react-redux';
import { todos, logger } from './middleware/HoloStore';
import { createStore, applyMiddleware } from 'redux';
import Login from './components/login/Login';

//fontFamily: 'Engli-Besh',

// const theme = createMuiTheme({
//   typography: createTypography(createPalette(), {
//     fontFamily: '"Comic Sans"',
//   })
// });

const store = createStore(todos, ['Use Redux'], applyMiddleware(logger));




store.dispatch({
  type: 'ADD_TODO',
  text: 'Understand the middleware'
})



const appStyles = makeStyles({
  main: {
    // backgroundColor: '#0a0a12',
    '& h1': {
      fontFamily: 'Engli-Besh, Times, serif',
      // fontFamily: 'Teuton',
      //fontFamily: 'Symbol, Times, serif',      
    }
  },
})



function App() {
  const classes = appStyles();

  useEffect(() => {
    // connection.start().then(() => {
    //   console.log('Connected')
    //   connection.invoke("updateServer", 'Hello Server').catch(function (err) {
    //     return console.error(err.toString());
    //   });
    // });

  
  }, []);

  return (
    <Provider store={store}> 
      <div className={classes.main}>
        <Login/>
        {/* <h1 className="red-glow">Glowing!</h1> */}
        {/* <div className="glow"></div> */}
        {/* <TabBar/> */}
        {/* <Navbar/>    */}
        {/* <SVG width={400} fill="#49c" /> */}
        {/* <HolocronSVG/> */}

        {/* <SquareButtonSVG width={"128"} height={"128"} fill={"#ccc"} />       */}
      </div>
    </Provider>
  );
}

export default App;
