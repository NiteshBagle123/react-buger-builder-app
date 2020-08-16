import React from 'react';
import Aux from '../../../hoc/Auxilary';

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
            <p>Continue to checkout!</p>
        </Aux>
    )
};
export default orderSummary