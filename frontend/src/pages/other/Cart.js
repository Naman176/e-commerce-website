import "../../assets/css/OrderStatus.css"
import PropTypes from "prop-types";
import React, { Fragment, useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import Loading from "../../components/Loading";
import {
  addToCart,
  decrementQty,
  removeFromCart,
  cartItemStock,
  removeAllFromCart,
  replace
} from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
const imageURL = "http://localhost:9000/static/";
// const imageURL = "https://infinite-sands-08332.herokuapp.com/static/";
// const URL = "https://infinite-sands-08332.herokuapp.com/";
const URL = "http://localhost:9000/sone/";
const Cart = ({
  isLogin,
  SetUserLogin,
  location,
  cartItems,
  products,
  currency,
  decrementQty,
  addToCart,
  removeFromCart,
  replace,
  removeAllFromCart
}) => {
  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  const [Products, setProducts] = useState(products.products);
  // let CartItems = cartItems;
  const [CartItems,setCartItems]=useState(cartItems);
  const [call, setcall] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log(CartItems);
  const { pathname } = location;
  let cartTotalPrice = 0;
  const fetchingErrorHandler = (err) => {
    addToast(err, {
      appearance: "warning",
      autoDismiss: true
    })
  }
  const modifyCartItems = (data) => {
    console.log(CartItems);
    CartItems.forEach((element, index) => {
      
      const product = data.find((obj) => {
        console.log(obj, element);
        return obj._id === element._id;
      });
      console.log(product);
      if (product)
      {
        setCartItems((state)=>{
          let temp=[...state];
          temp[index].stock = product.stock;
          temp[index].discountedPrice=product.discountedPrice;
          temp[index].productName=product.productName;
          temp[index].category=product.category;
          temp[index].price=product.price;
          if (temp[index].quantity > temp[index].stock) {
            temp[index].quantity = temp[index].stock;
          }
          return temp;
        })
      }
      else
        delete CartItems[index];
      console.log(CartItems);
    })
    replace(CartItems);
    setcall(0);
  }
  useEffect(() => {
    setCartItems(cartItems)
  }, [cartItems]);
  useEffect(() => {
    setLoading(true);
    fetch(`${URL}getProducts`).then(
      res => {
        console.log(res);
        if (res.status == 400) {
          fetchingErrorHandler("Error while Fetching Products here");
        }
        return res.json();
      }
      ).then(
        data => {
          setLoading(false);
          setProducts(data);
          console.log(data);
          modifyCartItems(data);
      }
    ).catch(err => {
      console.log(err)
      // fetchingErrorHandler("Error while Fetching Products there");
    });
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Cart</title>
        <meta
          name="description"
          content="Cart page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Cart
      </BreadcrumbsItem>

      <LayoutOne SetUserLogin={SetUserLogin}  headerTop="visible" isLogin={isLogin}>
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {loading&&<Loading></Loading>}
            {CartItems && CartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {CartItems.map((cartItem, key) => {
                            console.log(CartItems,key);
                            console.log(cartItem,cartItem.quantity);
                            const discountedPrice = cartItem.discountedPrice;
                            // const discountedPrice = getDiscountPrice(
                            //   cartItem.price,
                            //   cartItem.discount
                            // );
                            const finalProductPrice = (
                              cartItem.price * currency.currencyRate
                            ).toFixed(2);
                            const finalDiscountedPrice = (
                              discountedPrice * currency.currencyRate
                            ).toFixed(2);
                            let discount =100- (discountedPrice / cartItem.price) * 100;
                            discount = Math.floor(discount);
                            discountedPrice != null
                              ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                              : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  {/* <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.id
                                    }
                                  > */}
                                    <img
                                      className="img-fluid"
                                      src={
                                        imageURL +
                                        cartItem.image
                                      }
                                      alt=""
                                    />
                                  {/* </Link> */}
                               
                                  {/* <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.productID
                                    }
                                  > */}
                                    {cartItem.productName}
                                  {/* </Link> */}
                                  {cartItem.selectedProductColor &&
                                  cartItem.selectedProductSize ? (
                                    <div className="cart-item-variation">
                                      <span>
                                        Color: {cartItem.selectedProductColor}
                                      </span>
                                      <span>
                                        Size: {cartItem.selectedProductSize}
                                      </span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {currency.currencySymbol +
                                          finalProductPrice}
                                      </span>
                                      <span className="amount">
                                        {currency.currencySymbol +
                                          finalDiscountedPrice}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {currency.currencySymbol +
                                        finalProductPrice}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  {cartItem.stock===0?"Out of Stock":<div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        decrementQty(cartItem, addToast)
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        addToCart(
                                          cartItem,
                                          addToast,
                                          quantityCount
                                        )
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                          cartItem.stock
                                      }
                                    >
                                      +
                                    </button>
                                  </div>}
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? currency.currencySymbol +
                                      (
                                        finalDiscountedPrice * cartItem.quantity
                                      ).toFixed(2)
                                    : currency.currencySymbol +
                                      (
                                        finalProductPrice * cartItem.quantity
                                      ).toFixed(2)}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      removeFromCart(cartItem, addToast)
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => removeAllFromCart(addToast)}>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row justify-content-center">
                  {/* <div className="col-lg-4 col-md-6">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Estimate Shipping And Tax
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Get A Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        Total products{" "}
                        <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{" "}
                        <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span>
                      </h4>
                      
                   {isLogin?<Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Proceed to Checkout
                      </Link>:<Link onClick={()=>{
                          addToast("Login to checkout", {
                            appearance: "warning",
                            autoDismiss: true
                          });
                      }} to={process.env.PUBLIC_URL + "/login-register"}>
                        Proceed to Checkout
                      </Link>}

                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decrementQty: PropTypes.func,
  location: PropTypes.object,
  removeAllFromCart: PropTypes.func,
  removeFromCart: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
    products:state.productData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decrementQty: (item, addToast) => {
      dispatch(decrementQty(item, addToast));
    },
    removeFromCart: (item, addToast) => {
      dispatch(removeFromCart(item, addToast));
    },
    removeAllFromCart: addToast => {
      dispatch(removeAllFromCart(addToast));
    },
    replace: (data) => {
      dispatch(replace(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
