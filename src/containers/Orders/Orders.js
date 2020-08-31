import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import order from '../../components/Order/Order';

class Orders extends Component {
    state ={
        orders: [],
        loading: true
    }
    componentDidMount(){
        axios.get('/orders.json')
            .then((response) => {
                const fetchedData = [];
                for(let key in response.data){
                    fetchedData.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({
                    loading: false,
                    orders: fetchedData
                })
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredient}
                        price={order.price}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);