export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const DECREMENT_PRODUCT = "DECREMENT_PRODUCT";
const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});
const decrementProductSuccess = newStock => ({
  type: DECREMENT_PRODUCT,
  payload: newStock
});

// fetch products
export const fetchProducts = products => {
 
  return dispatch => {
    dispatch(fetchProductsSuccess(products));
  };
};
export const decrementProduct = newStock => {
 
  return dispatch => {
    dispatch(decrementProductSuccess(newStock));
  };
};
