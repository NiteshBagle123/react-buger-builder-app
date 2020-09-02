import React from 'react';
import classes from './Input.css';

const input = props => {
    let inputElement = null;
    let validationError = null; 
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        validationError =  validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }
    
    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}/>
            break;
        case ('textArea'): 
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>
        case ('select'): 
            inputElement = (
                <select 
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(
                            option => (
                                <option
                                    key={option.value} 
                                    value={option.value}>
                                    {option.displayValue}
                                </option>
                            )
                        )}
                </select>
            );
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
};

export default input;
