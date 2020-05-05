import React, { Component } from 'react';
import Button from './../../UI/Button/Button';

class orderSummary extends Component{
    componentWillUpdate(){
        
    }

    render (){
        const ingresientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key = {igKey}>
                <span style={{
                textTransform:'capitalize'}}>{igKey}
                </span>: {this.props.ingredients[igKey]} 
                </li>
        })
        return (
            <React.Fragment>
            <button/>
            <h3>Your Order</h3>
            <p>delicous burger  with following ingredients</p>
            <ul>
                {ingresientSummary}
            </ul>
            <p>Total Price: {this.props.price.toFixed(2)}</p>
            <p>Continue to checkout</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success"clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </React.Fragment>

        )
    }
}
 
export default orderSummary;