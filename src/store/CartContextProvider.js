import React, { useReducer } from "react";
import CartContext from "./cart-context";



const initialCartState = {
    items: [],
    totalAmount: 0
};



const cartReducer = (latestState, action) => {          //created outside the component function cuz this reducer func doesn't need any data from the component and we dont need it to be re-created everytime the component gets re-executed
    if (action.type === 'ADD_ITEM') {
        const updatedTotalAmount = latestState.totalAmount + (action.item.price * action.item.amount); 

        const existingCartItemIndex = latestState.items.findIndex(item => item.id === action.item.id);
        
        let updatedItems;
        if (existingCartItemIndex > -1) {
            const existingCartItem = latestState.items[existingCartItemIndex];

            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }

            updatedItems = [...latestState.items];
            updatedItems[existingCartItemIndex] = updatedItem;

        } else {
            updatedItems = [...latestState.items, action.item]; 
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'REMOVE_ITEM') {
        const itemToRemoveIndex = latestState.items.findIndex(item => item.id === action.id);
        
        const itemToRemove = latestState.items[itemToRemoveIndex];
        
        const updatedTotalAmount = latestState.totalAmount - itemToRemove.price; 

        let updatedItems;
        if(itemToRemove.amount === 1) {
            updatedItems = [...latestState.items];
            updatedItems.splice(itemToRemoveIndex, 1);
            //OR
            //updatedItems = latestState.items.filter(item => item.id !== itemToRemove.id);
        } else {
            const updatedItem = {
                ...itemToRemove,
                amount: itemToRemove.amount - 1
            }

            updatedItems = [...latestState.items];
            updatedItems[itemToRemoveIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'CLEAR_CART') {
        return initialCartState;
    }

    return initialCartState;
}




const CartContextProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, initialCartState);
    
    const addItemToCartHandler = item => {  
        dispatchCartAction({type: 'ADD_ITEM', item: item});     //action with type 'ADD_ITEM'
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE_ITEM', id: id})       //action with type 'REMOVE_ITEM'
    }

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR_CART'})
    }

    const cartContextData = {       //this is the actual value (an obj with some properties and methods) stored in the created CartContext through its provider which can then be consumed in any component the provider wraps by the use of useContext(context-component) e.g const ctx = useContext(CartContext). ctx.items, ctx.addItem(item) etc
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }
    
    return (
        <CartContext.Provider value={cartContextData}>
            {props.children}
        </CartContext.Provider>
    )

}

export default CartContextProvider;