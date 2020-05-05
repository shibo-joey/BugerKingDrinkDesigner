import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label:'Lemon',type:'lemon'},
    {label:'Ice',type:'ice'},
    {label:'Spring',type:'spring'},
    {label:'Cola',type:'cola'}
]

const buildControls = (props) => {
    return ( 
        <div className={classes.BuildControls}>
            <p>Current Price: {props.price.toFixed(2)} </p>
            {controls.map(ctrl => (
                <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added = {() =>props.ingredientAdded(ctrl.type)}
                deleted = {() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
            ))}
            <button 
            className={classes.OrderButton}
            disabled = {!props.purchased}
            onClick={props.ordered}
            >Order Now</button>
        </div>
     );
}
 
export default buildControls;