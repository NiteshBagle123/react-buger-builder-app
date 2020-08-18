import React, { Component } from 'react';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Button from '../../../UI/Button/Button';

class OrderSummary extends Component {
    // this could be a functional component
    componentDidUpdate(){
        console.log('[ OrderSummary] componentDidUpdate')
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(
            ingredientType => <li key={ingredientType}>
                    <span style={{textTransform: 'capitalize'}}>{ingredientType}</span>: {this.props.ingredients[ingredientType]}
                </li>
        );
        return(
            <Aux>
                <h3>Your order!</h3>
                <p>Delicious burger with following ingredients!</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price:{this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to checkout!</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }
};

export default OrderSummary