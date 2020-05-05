import React from 'react';
import logoImage from "../../assets/images/original.png"
import classes from './Logo.module.css'

const logo = (props) => {
    return ( 
        <div className={classes.Logo} style= {{height: props.height}}>
            <img src={logoImage} alt="logoIm"/>
        </div>
     );
}
 
export default logo;