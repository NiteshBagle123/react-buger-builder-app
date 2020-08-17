import React from 'react';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems';
import classes from './SideDrawer.css';

const sideDrawer = props => {
    return(
        <div className={attachedClasses}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    )
};

export default sideDrawer;
