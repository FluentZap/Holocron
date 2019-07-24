import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core'



const appStyles = makeStyles({
    container: {
        backgroundColor: '#9f0918',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 0px 5px 1px rgba(181, 26, 26, 0.75)'
    },    
    button: {
        fontFamily: 'Engli-Besh, Times, serif',
        backgroundColor: '#790713',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})


function Button(props) {
    const classes = appStyles();
    const { width, height, text } = props;
    // console.log(props);

    return (
        <div className={classes.container} style={{ width: width + 4, height: width + 4 }}>
            <div className={classes.button} style={{ width: width, height: width }}>
                <h2>{text}</h2>
            </div>
        </div>
    );
}

export default Button;
