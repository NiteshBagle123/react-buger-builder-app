import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    // state ={
    //     ingredients : null,
    //     totalPrice: 0
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()) {
    //         if(param[0] === 'price'){
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({ ingredients, totalPrice: price })
    // }
    checkoutSummaryCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutSummaryContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    onCheckoutCancel={this.checkoutSummaryCancelHandler}
                    onCheckoutContinue={this.checkoutSummaryContinueHandler}/>
                {/* <Route path={`${this.props.match.path}/contact-data`} component={ContactData}/> */}
                <Route 
                    path={`${this.props.match.path}/contact-data`}
                    component={ContactData}
                    // render={(props) => (
                    //     <ContactData 
                    //         {...props}
                    //         ingredients={this.props.ings}
                    //         price={this.props.price} />
                    // )}
                    />
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);