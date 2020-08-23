import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1,
    cheese: 0.6,
    bacon: 1.3
}; 
class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //     }
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-burger-axios-app.firebaseio.com/orders/ingredients.json')
            .then(response => {
                this.setState({
                     ingredients: response.data
                });
            })
            .catch(err => {
                this.setState({
                    error: true
                })
            });
    }
    updatePurchaseState = ingredients => {        
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((sum, el) => sum + el, 0);
        
            this.setState({
                purchasable: sum > 0
            })
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
        // alert('You continue');
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
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
            }).catch(err => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            });
    }

    addIngredientHadler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        const updatedIngredientCount = oldIngredientCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedIngredientCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        this.setState({ ingredients: updatedIngredient, totalPrice: updatedPrice });
        this.updatePurchaseState(updatedIngredient);
    };

    removeIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        if(oldIngredientCount <= 0){
            return;
        }
        const updatedIngredientCount = oldIngredientCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedIngredientCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceDeduction;
        this.setState({ ingredients: updatedIngredient, totalPrice: updatedPrice });
        this.updatePurchaseState(updatedIngredient);
    };
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can not be loaded</p> : <Spinner />;

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        if(this.state.ingredients){
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}/>;

            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHadler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
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

export default withErrorHandler(BurgerBuilder, axios);
