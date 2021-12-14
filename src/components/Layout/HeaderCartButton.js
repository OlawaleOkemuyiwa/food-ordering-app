import React, { useContext, useEffect, useState } from "react";  

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = props => {
    const [isBtnBumpy, setIsBtnBumpy] = useState(false);

    const cartCtx = useContext(CartContext);  //HeaderCartButton component will be re-executed whenever context value changes(when the value set in CartContextProvider gets updated through state)
    
    const { items } = cartCtx;

    const noOfCartItems = items.reduce((acc, item) => acc + item.amount, 0);
    

    const btnClasses = `${classes.button} ${isBtnBumpy ? classes.bump : ''}`;


    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setIsBtnBumpy(true);
        const timer = setTimeout(() => { //wait 300ms(the time it takes the bump animation to finish) so  remove the bump class
            setIsBtnBumpy(false);
        }, 300)

        return () => {          //clear the old timer and make sure a timer is set. Also a good practice to clean up timers/other side effects used in the CB func of useEffect
            clearTimeout(timer);
        };
    }, [items])


    return (
        <button className={btnClasses} onClick={props.onClick}>
            <div className={classes.icon}>
                <CartIcon />
            </div>
            <div>Your Cart</div>
            <div className={classes.badge}>{noOfCartItems}</div>
        </button>
    )
}

export default HeaderCartButton;