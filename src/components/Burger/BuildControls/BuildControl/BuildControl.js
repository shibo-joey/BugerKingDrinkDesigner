import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) => {
    return ( 
        <div className={classes.BuildControl}>
            <div>{props.label}</div>
            <button onClick = {props.added} > add </button>
            <button onClick = {props.deleted} disabled={props.disabled}> remove </button>
        </div>
     );
}
 
export default buildControl;