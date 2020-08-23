import React, { Component } from 'react';
import Modal from '../../UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';

const withErrorHandler = (WrappedComponent, axios) => class extends Component { 
    state = {
        error: null
    }
    componentWillMount(){
        this.requestInterceptor = axios.interceptors.request.use(req => {
            this.setState({ error: null });
            return req;
        })
        this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
            this.setState({ error });
        });
    }

    componentWillUnmount() {
        axios.interceptors.request.eject(this.requestInterceptor);
        axios.interceptors.response.eject(this.responseInterceptor);
    }
    errorConfirmHandler = () => {
        this.setState({
            error: null
        })
    }
    render() {
        return (
            <Aux>
                <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmHandler}>
                    {this.state.error ? this.state.error.message: null }
                </Modal>
            <WrappedComponent {...this.props}/>
        </Aux>
        )
    };
};

export default withErrorHandler;
