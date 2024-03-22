import React, { createContext, useReducer } from "react";
import ShippingReducer from "./ShippingReducer";

// Initial state
// const initialState = 
// {
//   _id: null,
//   name: null,
//   isAdmin: false,

// };

const initialState = {
shippingAddress:{}
};

// Create context
export const ShippingContext = createContext(initialState);

// Provider component
export const ShippingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ShippingReducer, initialState);

  // Actions

  function saveShippingAddress( shippingAddress) {
    dispatch({
      type: "SAVE_SHIPPINGADDRESS",
      payload:shippingAddress
    });
  }
 
  return (
    <ShippingContext.Provider
      value={{
       shippingAddress: state.shippingAddress,
       saveShippingAddress,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};
