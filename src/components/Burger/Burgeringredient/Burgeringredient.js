import React, { Component } from 'react';
import classes from './Burgeringredient.module.css';
import PropTypes from 'prop-types';
import imageBottom from './image/bottom.jpg';
import imageTop from './image/top.jpg'




class BurgerIngredient extends Component{

render(){
    let ingredient = null
    switch(this.props.type){
        case('bread-bottom'):
            ingredient = 
            <img className={classes.ImageBottom} src={imageBottom} alt="bottom"/>
            break;

        case('bread-top'):
            ingredient = 
            // <div className = {classes.BreadTop}>
            //         <div className={classes.Seeds1}></div>
            //         <div className={classes.Seeds2}></div>
            // </div>
            <img className={classes.ImageTop} src={imageTop} alt="top"/>
            break

        case('ice'):
            ingredient = <div className ={classes.Ice} ></div>;
            break

        case('spring'):
            ingredient = <div className ={classes.Spring} ></div>;
            break

        case('cola'):
            ingredient = <div className ={classes.Cola} ></div>;
            break

        case('lemon'):
            ingredient = <div className ={classes.Lemon} ></div>;
            break
        default:
            ingredient = null

    }

    return ( 
        ingredient
     );

    }
}
  
BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}
 
export default BurgerIngredient;