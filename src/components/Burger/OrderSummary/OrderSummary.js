import React from 'react';
import Aux from '../../../hoc/Auxilary';
import Button from '../../../UI/Button/Button';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map(
        ingredientType => <li key={ingredientType}>
                <span style={{textTransform: 'capitalize'}}>{ingredientType}</span>: {props.ingredients[ingredientType]}
            </li>
    );
    return (
        <Aux>
            <h3>Your order!</h3>
            <p>Delicious burger with following ingredients!</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:{props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout!</p>
            <Button btnType='Danger' clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    )
};
export default orderSummary