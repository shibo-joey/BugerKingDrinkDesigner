import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './Burgeringredient/Burgeringredient';

const burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients)
    .map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
           return  <BurgerIngredient key={igKey+"key"} type = {igKey}/>
        }
        )
    })
    .reduce((arr,el) => {
        return arr.concat(el)
    },[])

    if(transformedIngredient.length === 0) {
        transformedIngredient = "Please add ingredient"
    }

    return ( 
    <div className={classes.Burger}>
        <BurgerIngredient type="bread-top"/>
        <div className={classes.BurgerInside}>
        {transformedIngredient}
        </div>   
        <BurgerIngredient type="bread-bottom"/>
    </div> );
}
 
export default burger;