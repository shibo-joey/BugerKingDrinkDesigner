import React, { Component } from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode:''
        },
        loading:false
      }

    orderHnadler =(event) =>{
        event.preventDefault()
        this.setState({loading:true})
        const order= {
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer: {
                name: 'my best friends',
                address:{
                    street:'university park',
                    zipcode: '14220',
                    country : 'US'
                }
            }
        }
        axios.post('/orders.json', order)
                .then(response => {
                    this.setState({loading:false})
                    this.props.history.push('/') })
                .catch(error =>{ this.setState({loading:false})
})
}


    render() { 
        let form = ( 
        <form>
            <input className={classes.Input} type="text" name="name" placeholder="your name"/>
            <input className={classes.Input} type="email" name="email" placeholder="your email"/>
            <input className={classes.Input} type="text" name="street" placeholder="your street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="your postal"/>
            <Button 
            btnType="Success"
            clicked={this.orderHnadler}
            >order </Button>
        </form>);
        if(this.state.loading){
            form=<Spinner/>
        }
        return ( 
            <div className={classes.ContactData}>
                <h4>enter your contact data </h4>
               {form}
            </div>
         );
    }
}
 
export default ContactData;