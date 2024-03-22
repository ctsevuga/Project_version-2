const shippingReducer = (state, action) => {
  switch (action.type) {
    

    case "SAVE_SHIPPINGADDRESS":
      return {
        ...state,
        shippingAddress: action.payload,
      
        
      };

    default:
      return state;
  }
};

export default shippingReducer;
