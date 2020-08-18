import React, { Component } from 'react';
import Aux from '../Auxilary/Auxilary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
