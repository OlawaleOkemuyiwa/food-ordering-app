import React, { useState, useRef } from "react";

import classes from './Checkout.module.css';

const isNotEmpty = value => value.trim() !== '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = props => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,     //the validity of these inputs are set to true on load even tho technically they're not but for the sake that the error messages would be displayed if false they're set to false on load even when the user hasnt put in any inputs, they're set to true
        street: true,
        postalCode: true,
        city: true
    });

    const nameInputRef = useRef(null);
    const streetInputRef = useRef(null);
    const postalInputRef = useRef(null);
    const cityInputRef = useRef(null);

    const orderConfirmedHandler = event => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = isNotEmpty(enteredName);
        const enteredStreetIsValid = isNotEmpty(enteredStreet);
        const enteredPostalIsValid = isFiveChars(enteredPostal);
        const enteredCityIsValid = isNotEmpty(enteredCity);
        
        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode:enteredPostalIsValid,
            city: enteredCityIsValid
        });

        const formIsValidForSubmission = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid;

        if (!formIsValidForSubmission) {
            return;
        }

        //Submit cart data
        const customerInfo = {
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostal,
            city: enteredCity
        }
        props.retrieveCustomerInfo(customerInfo);
    }

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
    const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`

    return (
        <form onSubmit={orderConfirmedHandler} className={classes.form}>
            <div className={nameControlClasses}>
                <label htmlFor="name">Your Name</label>
                <input type="text" ref={nameInputRef} id="name"></input>
                {!formInputsValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" ref={streetInputRef} id="street"></input>
                {!formInputsValidity.street && <p>Please enter a valid street</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" ref={postalInputRef} id="postal"></input>
                {!formInputsValidity.postalCode && <p>Please enter a valid postal code</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input type="text" ref={cityInputRef} id="city"></input>
                {!formInputsValidity.city && <p>Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button type="submit" className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
};

export default Checkout;