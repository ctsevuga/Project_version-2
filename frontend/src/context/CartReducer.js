import { updateCart } from '../utils/cartUtils';
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      // updateCart(state,item);
      return {
        ...state
    };
     
    case "REMOVE_ITEM":
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return {
        ...state,
       
      };
    // case "SAVE_SHIPPINGADDRESS":
    //   state.shippingAddress = action.payload;
    //   return {
    //     ...state,  
        
    
    //     };  

    default:
      return state;
  }
};

export default cartReducer;
