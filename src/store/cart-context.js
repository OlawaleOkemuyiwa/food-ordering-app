import React from "react";

// const CartContext = React.createContext();           //We can simply do this or createContext with a default value

const CartContext = React.createContext({              //creeating context with a default obj value with these properties and empty methods is OPTIONAL and it is only provided for auto-completion of the context data property from IDE during the accessing and using of stored data
    items: [],
    totalAmount: 0,
    addItem: item => {},
    removeItem: id => {},
    clearCart: () => {}
});


export default CartContext;
