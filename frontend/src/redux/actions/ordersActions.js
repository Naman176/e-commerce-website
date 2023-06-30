export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";

const fetchOrdersSuccess = orders => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders
});

// fetch orders
export const fetchOrders = orders => {
  return dispatch => {
    dispatch(fetchOrdersSuccess(orders));
  };
};
