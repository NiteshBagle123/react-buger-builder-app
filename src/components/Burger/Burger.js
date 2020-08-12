import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transFormIngredient = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            })
        })
        .reduce((acc, curr) =>{
            return acc.concat(curr)
        }, []);
    
    if(!transFormIngredient.length){
        transFormIngredient = <p>Please start adding ingredients</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
                {transFormIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
