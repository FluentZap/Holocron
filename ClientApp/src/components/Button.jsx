import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core'



const appStyles = makeStyles({
    glow: {
        filter: 'drop-shadow(0px 0px 4px red)'
    },
    container: {
        backgroundColor: '#9f0918',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // boxShadow: '0px 0px 5px 1px rgba(181, 26, 26, 0.75)',
        margin: 10,
        clipPath: 'polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%)',
        borderRadius: 5,
    },
    button: {
        fontFamily: 'Engli-Besh, Times, serif',
        backgroundColor: '#790713',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        clipPath: 'polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%)',
        borderRadius: 5,
    },
})


function Button(props) {
    const classes = appStyles();
    let { width, height, text } = props;
    if (!width) width = 64;
    if (!height) height = 64;
    return (
        <div className={classes.glow}>
            <div className={classes.container} style={{ width: width + 4, height: height + 4 }}>
                <div className={classes.button} style={{ width: width, height: height }}>
                    <h2>{text}</h2>
                </div>
            </div>
        </div>
    );
}

export default Button;
