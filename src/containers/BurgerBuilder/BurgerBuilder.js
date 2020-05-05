import React, { Component } from 'react';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../components/withErrorhandler/withErrorHandler';


const INGREDIENT_PRICE = {
    cola:0.5,
    ice: 0.3,
    spring: 0.4,
    lemon: 0.7
}
class BurgerBuilder extends Component {


    state = { 
            ingredients: null,
            totalPrice: 4,
            perchaseable: false,
            purchasing: false,
            loading: false
     }

     componentDidMount(){
         axios.get('https://my-burgerking.firebaseio.com/ingredients.json')
         .then(response => {
             this.setState({ingredients: response.data})
         })
         .catch(error => console.log(error))
     }

     updatePurchaseState(ingredients){
         const sum = Object.keys(ingredients)
         .map(igKey => {
             return ingredients[igKey]
         })
         .reduce((sum,el)=>{
             return sum + el
         },0);

         this.setState({perchaseable: sum > 0})
     }

     addIngred= (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngre = {...this.state.ingredients}
        updatedIngre[type] = updatedCount
        const priceAddition = INGREDIENT_PRICE[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice+ priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngre})
        this.updatePurchaseState(updatedIngre)
     }


     removeIngred=(type)=>{
        const oldCount = this.state.ingredients[type];

        if(oldCount <=0){
            return
        }
        const updatedCount = oldCount - 1;
        const updatedIngre = {...this.state.ingredients}
        updatedIngre[type] = updatedCount
        const priceAddition = INGREDIENT_PRICE[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngre})
        this.updatePurchaseState(updatedIngre)
     }

     purchaseHandler = () => {
         this.setState({purchasing: true})
     }
     purchaseCancelHandler = () =>{
        this.setState({purchasing: false})
     }
     purchaseContinueHandler = () =>{
        // alert('continue?')
        

        const queryParams = []
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')

        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString
        })        
     }

     

    render() { 
        const disabledInfo={
            ...this.state.ingredients
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        let orderSummarys = null
        let burger = <Spinner/>

        if(this.state.ingredients){
            burger =  (
                <React.Fragment>
                 <Burger ingredients = {this.state.ingredients}/>
                 <BuildControls
                    ingredientAdded = {this.addIngred}
                    ingredientRemoved = {this.removeIngred}
                    disabled={disabledInfo}
                    price = {this.state.totalPrice}
                    purchased = {this.state.perchaseable}
                    ordered={this.purchaseHandler}
                    />
                    </React.Fragment>
                )
            orderSummarys =  <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice}
                />

            if(this.state.loading){
                orderSummarys = <Spinner/>
            }
        }

        
        return (  
            <React.Fragment>
                <Modal show={this.state.purchasing}
                       modalClosed={this.purchaseCancelHandler}>
                    {orderSummarys}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}
 
export default withErrorHandler(BurgerBuilder, axios);