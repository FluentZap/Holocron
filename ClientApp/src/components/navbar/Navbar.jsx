import React from 'react'
import { makeStyles } from '@material-ui/core'

const appStyles = makeStyles({
    navbar: {
        position: "fixed",
        top: 0,
        width: '100%',
        height: 60,
        backgroundColor: 'blue',
    }
});

export default function Navbar() {
    const classes = appStyles();
    return (
        <div className={classes.navbar}>

        </div>
    )
}
