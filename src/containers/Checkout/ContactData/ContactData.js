import axios from '../../../axios';
import React, { Component } from 'react';
import Button from '../../../UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // alert('You continue');
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Nitesh Bagle',
                address: {
                    street: 'Mumbai',
                    zipCode: 421002,
                    country: 'India'
                },
                email: 'test.test@dev.com'
            },
            deliveryMethod: 'Fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
                this.props.history.push('/');
            }).catch(err => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            });
    }
    render() {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="You Name" />
                <Input inputtype="input" type="email" name="email" placeholder="Your email" />
                <Input inputtype="input" type="text" name="street" placeholder="Your Street" />
                <Input inputtype="input" type="text" name="postal" placeholder="Your Postal" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data!</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;