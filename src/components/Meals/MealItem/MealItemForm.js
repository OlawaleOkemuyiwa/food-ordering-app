import React, { useRef, useState } from "react";

// import CartContext from "../../../store/cart-context";
import InputBox from "../../UI/InputBox";
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef(null);

    const addMealHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNo = parseInt(enteredAmount, 10);

        if (enteredAmount.trim().length === 0 || enteredAmountNo < 1 || enteredAmountNo > 5) {  //min/max/step value of input already set so this is quite redundant
            setAmountIsValid(false);
            return;
        }

        props.retrieveAmount(enteredAmountNo);
    }

    return (
        <form className={classes.form} onSubmit={addMealHandler}>
            <InputBox 
                ref={amountInputRef}  //forwarding ref from custom InputBox component to child built-in input
                label="Amount" 
                inputData={{type: 'number', id: `amount-${props.id}`, min: '1', max: '5', step: '1', defaultValue: '1'}} 
            />
            <button type="submit">&#43; Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    )
}

export default MealItemForm;