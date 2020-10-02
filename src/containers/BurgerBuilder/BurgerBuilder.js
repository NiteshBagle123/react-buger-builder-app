import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //     }
    // }
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        // axios.get('https://react-burger-axios-app.firebaseio.com/orders/ingredients.json')
        //     .then(response => {
        //         this.setState({
        //              ingredients: response.data
        //         });
        //     })
        //     .catch(err => {
        //         this.setState({
        //             error: true
        //         })
        //     });
    }
    updatePurchaseState = ingredients => {        
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((sum, el) => sum + el, 0);
        
           return sum > 0;
    }

    purchaseHanlder = () => {
        this.setState({
            purchasing: !this.state.purchasing
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        // const queryBuilder = [];
        // for(let i  in this.state.ingredients){
        //     queryBuilder.push(
        //         encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i])
        //     );
        // }
        // queryBuilder.push(`price=${this.state.totalPrice}`);
        // const queryString = queryBuilder.join('&');
        this.props.history.push('/checkout');
    }

    // addIngredientHadler = (type) => {
    //     const oldIngredientCount = this.state.ingredients[type];
    //     const updatedIngredientCount = oldIngredientCount + 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredient[type] = updatedIngredientCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const updatedPrice = oldPrice + priceAddition;
    //     this.setState({ ingredients: updatedIngredient, totalPrice: updatedPrice });
    //     this.updatePurchaseState(updatedIngredient);
    // };

    // removeIngredientHandler = (type) => {
    //     const oldIngredientCount = this.state.ingredients[type];
    //     if(oldIngredientCount <= 0){
    //         return;
    //     }
    //     const updatedIngredientCount = oldIngredientCount - 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredient[type] = updatedIngredientCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const updatedPrice = oldPrice - priceDeduction;
    //     this.setState({ ingredients: updatedIngredient, totalPrice: updatedPrice });
    //     this.updatePurchaseState(updatedIngredient);
    // };
    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can not be loaded</p> : <Spinner />;

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        if(this.props.ings){
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                totalPrice={this.props.price}/>;

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        totalPrice={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        order={this.purchaseHanlder}/>
                </Aux>
            );
        };

        return(
            <div>
                <Aux>
                    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                        {orderSummary}
                    </Modal>
                    {burger}
                </Aux>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemove: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
