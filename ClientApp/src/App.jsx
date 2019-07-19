import React from 'react';
import { makeStyles } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/styles';
import Navbar from './components/navbar/Navbar';
import { SquareButtonSVG, HolocronSVG } from './SVG';

//fontFamily: 'Engli-Besh',

// const theme = createMuiTheme({
//   typography: createTypography(createPalette(), {
//     fontFamily: '"Comic Sans"',
//   })
// });



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
  return (
    <div className={classes.main}>
      {/* <Navbar/>    */}
      {/* <SVG width={400} fill="#49c" /> */}
      <HolocronSVG />
      <SquareButtonSVG width={"128"} height={"128"} fill={"#ccc"} />      
    </div>
  );
}

export default App;
