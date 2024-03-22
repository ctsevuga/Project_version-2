import React, { createContext, useReducer } from "react";
import CartReducer from "./CartReducer";

// Initial state
const initialState = {
  // cartItems: [ ], shippingAddress: {}, itemsPrice: 0,shippingPrice: 0,totalPrice: 0
  cartItems: [ ]
};

// Create context
export const CartContext = createContext(initialState);

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  // Actions

  function addItem(item) {
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  }
  function removeItem(id) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  }
  // function saveShippingAddress({shipAddress}) {
  //   dispatch({
  //     type: "SAVE_SHIPPINGADDRESS",
  //     payload: shipAddress,
  //   });
  // }
  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addItem,
        removeItem,
        // saveShippingAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
