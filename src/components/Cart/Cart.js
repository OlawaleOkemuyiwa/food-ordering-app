import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import classes from './Cart.module.css';

const Cart = props => {
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [orderIsSubmitting, setOrderIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasCartItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({
            ...item,
            amount: 1
        });
    }

    const orderItemsHandler = () => {
        setShowCheckoutForm(true);
    }

    const submitOrderHandler = async (customerData) => {
        try {
            setOrderIsSubmitting(true);

            const order = {
                customerInfo: customerData,
                orderedItems: cartCtx.items
            }
            const response = await fetch('https://new-react-http-bdae2-default-rtdb.firebaseio.com/orders.json', {
                method: 'POST',
                body: JSON.stringify(order)
            });

            if (!response.ok) {
                throw new Error('Something went wrong with the order!');
            }

            setOrderIsSubmitting(false);             //normally, setState is asynchronous, that is: when a setState is called, it is scheduled and batched with other setStates(if there are others) for component function re-execution. But when setState is called in an async func between await keyword. setState begins to function like its synchronous (not scheduled/batched), trigerring component function re-execution immediately its called
            setDidSubmit(true);
            cartCtx.clearCart();
        } catch (error) {
            setOrderIsSubmitting(false);
            alert(error.message)
        }
    }

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--nobg']} onClick={props.onClose}>Close</button>
            {hasCartItems && <button className={classes['button--brownbg']} onClick={orderItemsHandler}>Order</button>}
        </div>
    )

    const cartModalContent = (
        <React.Fragment>
            <ul className={classes['cart-items']}>
                {cartCtx.items.map(item => (
                    <CartItem 
                        key={item.id} 
                        id={item.id} 
                        name={item.name} 
                        amount={item.amount} 
                        price={item.price} 
                        onRemove={cartItemRemoveHandler.bind(null, item.id)} 
                        onAdd={cartItemAddHandler.bind(null, item)} 
                    />
                ))} 
            </ul>
            {showCheckoutForm && <Checkout onCancel={props.onClose} retrieveCustomerInfo={submitOrderHandler} />}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {!showCheckoutForm && modalActions}
        </React.Fragment>
    )

    const isSubmittingModalContent = <p>Sending order request...</p>

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Order successfully sent!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
        </React.Fragment>
    ) 
    
    return (
        <Modal onClose={props.onClose}>
            {!orderIsSubmitting && !didSubmit && cartModalContent}
            {orderIsSubmitting && !didSubmit && isSubmittingModalContent}
            {!orderIsSubmitting && didSubmit &&  didSubmitModalContent}
        </Modal>
    )
}

export default Cart;