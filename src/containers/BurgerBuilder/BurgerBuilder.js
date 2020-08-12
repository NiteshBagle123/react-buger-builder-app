import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    render() {
        return(
            <div>
                <Aux>
                    <Burger />
                    <div>Build controls</div>
                </Aux>
            </div>
        );
    }
}

export default BurgerBuilder;
