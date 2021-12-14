import React from "react";

import classes from './InputBox.module.css';

const InputBox = React.forwardRef((props, forwardedRef) => {   
    return (
        <div className={classes['input-box']}>
            <label htmlFor={props.inputData.id}>{props.label}</label>
            <input ref={forwardedRef} {...props.inputData}></input>    {/*spreading out the keys/values of inputData obj to make them the attriubute/value of input element*/}
        </div>
    )
});

export default InputBox;