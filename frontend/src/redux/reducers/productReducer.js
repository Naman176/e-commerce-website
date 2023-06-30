import { FETCH_PRODUCTS_SUCCESS } from "../actions/productActions";
import { DECREMENT_PRODUCT } from "../actions/productActions";

const initState = {
  products: []
};

const productReducer = (state = initState, action) => {
 
  if (action.type === FETCH_PRODUCTS_SUCCESS) {
    return {
      ...state,
      products: action.payload
    };
  }
  else if (action.type === DECREMENT_PRODUCT) {
    let Products = state.products;
    
    for (let i = 0; i < Products.length; i++){
      if (Products[i]._id === action.payload._id) {
        Products[i].stock = action.payload.stock;
        break;
      }
    }
    
    return {
      ...state,
      products:Products
    }
  }

  return state;
};

export default productReducer;
