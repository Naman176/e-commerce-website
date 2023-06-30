export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const REPLACE_ALL_FROM_CART = "REPLACE_ALL_FROM_CART";

//add to cart
export const addToCart = (
  item,
  addToast,
  quantityCount,
  selectedProductColor,
  selectedProductSize
) => {
  return dispatch => {
    if (addToast) {
      addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }
    console.log(item, quantityCount,
      selectedProductColor,
      selectedProductSize);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        quantity: quantityCount,
        selectedProductColor: selectedProductColor
          ? selectedProductColor
          : item.selectedProductColor
          ? item.selectedProductColor
          : null,
        selectedProductSize: selectedProductSize
          ? selectedProductSize
          : item.selectedProductSize
          ? item.selectedProductSize
          : null
      }
    });
  };
};
//decrement from cart
export const decrementQty = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Item Decremented From Cart", {
        appearance: "warning",
        autoDismiss: true
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//remove from cart
export const removeFromCart = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Removed From Cart", { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
//remove all from cart
export const removeAllFromCart = addToast => {
  return dispatch => {
    if (addToast) {
      addToast("Removed All From Cart", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};
export const replace = (data) => {
  return dispatch => {
    dispatch({ type: REPLACE_ALL_FROM_CART,payload:data });
  };
};

// get stock of cart item
export const cartItemStock = (item) => {
  if (item.stock) {
    return item.stock;
  }
  //  else {
  //   return item.variation
  //     .filter(single => single.color === color)[0]
  //     .size.filter(single => single.name === size)[0].stock;
  // }
};
