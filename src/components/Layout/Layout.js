import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    };

    sideDrawerClosedHandler = () => {
        this.setState( {
            showSideDrawer: !this.state.showSideDrawer
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState({
            showSideDrawer: ((prevState) => {
                return ({ showSideDrawer: !prevState.showSideDrawer})
            })
        })
    }
    render(){
        return(
            <Aux>
                <Toolbar 
                    clicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

};

export default Layout;
