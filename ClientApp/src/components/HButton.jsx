import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core'



const appStyles = makeStyles({
    glow: {
        filter: 'drop-shadow(0px 0px 2px red)'
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


function HButton(props) {
    const classes = appStyles();
    let { width, height, text, style} = props;
    if (!width) width = '64px';
    if (!height) height = '64px';
    return (
        <div className={classes.glow} style={style}>
            <div className={classes.container} style={{ width: width, height: height }}>
                <div className={classes.button} style={{ width: `calc(${width} - 4px)`, height: `calc(${height} - 4px)` }}>
                    <h2>{text}</h2>
                </div>
            </div>
        </div>
    );
}

export default HButton;
