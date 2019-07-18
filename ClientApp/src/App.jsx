import React from 'react';
import { makeStyles } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/styles';
import Navbar from './components/navbar/Navbar';

//fontFamily: 'Engli-Besh',

// const theme = createMuiTheme({
//   typography: createTypography(createPalette(), {
//     fontFamily: '"Comic Sans"',
//   })
// });

const appStyles = makeStyles({
  main: {
    // backgroundColor: 'green',
    '& h1': {
      fontFamily: 'Engli-Besh, Times, serif',
      // fontFamily: 'Teuton',
      //fontFamily: 'Symbol, Times, serif',
    }
  },
})



function App() {  
  const classes = appStyles();
  return (
    <div className={classes.main}>
     <Navbar/>   
     
    </div>
  );
}

export default App;
