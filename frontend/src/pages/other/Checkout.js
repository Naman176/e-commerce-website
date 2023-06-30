import PropTypes from "prop-types";
import React, { Fragment,useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useToasts } from "react-toast-notifications";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { removeAllFromCart} from "../../redux/actions/cartActions";
import { decrementProduct} from "../../redux/actions/productActions";
// const URL = "https://infinite-sands-08332.herokuapp.com/";
const URL = "http://localhost:9000/";
const Checkout = ({user, location, cartItems, currency,isLogin,SetUserLogin,removeAllFromCart ,decrementProduct}) => {
  const { pathname } = location;
 
  let {addToast} = useToasts();
  let cartTotalPrice = 0;
  const [name, setName] = useState(user.name?user.name:"");
  const [deliverOption, setDeliverOption] = useState("Pickup");
  const [address, setAddress] = useState(user.address?user.address:"");
  const [phone, setPhone] = useState(user.number?user.number:"");
  const [email, setEmail] = useState(user.email?user.email:"");
  const [note, setNote] = useState("");
  const history = useHistory();
  const isValid = () => {
    let emailPattern = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    let emailPattern2 = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+\.[A-Za-z]+$/);
    let emailPattern3 = new RegExp(/^[a-zA-Z0-9]+\.+[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    let valid = [0, 1, 0, 0, 0, 1];
    let validityof=["Name","deliveryOption","Address","Phone Number","Email","Note"]
    if (name.trim().length > 0) valid[0] = 1;
    if (deliverOption!=="Pickup"&&address.trim().length>0) valid[2] = 1;
    if (deliverOption==="Pickup") valid[2] = 1;
    if ((phone+"").length === 10) valid[3] = 1;
    if ((emailPattern.test(email) || emailPattern2.test(email)|| emailPattern3.test(email))) valid[4] = 1;
    for (let i = 0; i < 6;i++) {
      if (valid[i] === 0) {

        addToast(`Please Write valid ${validityof[i]}`, 
          {
            appearance: "warning",
            autoDismiss: true
          }
        )
        return false;
      }
    }
    return true;
    

  }
  const placeOrder = () => {
    if (isValid()) {
      const orderData = {
        userID: user,
        name,
        address,
        phone,
        email,
        note,
        deliverOption,
        products: cartItems,
        status:"PLACED"
      }
      axios.post(`${URL}placeOrder`, 
        orderData).then(res => {
          console.log(res);
          addToast("Order Placed Successfully",{
            appearance:"success",
            autoDismiss:true
          })
          setName("");
          setAddress("");
          setNote("");
          setPhone("");
          setEmail("");
          for (let i = 0; i < cartItems.length; i++){
            decrementProduct({ _id: cartItems[i]._id, stock: (cartItems[i].stock - cartItems[i].quantity) });
          }
          removeAllFromCart();
          history.push('/');
        })
      }
    }
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Checkout</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <LayoutOne SetUserLogin={SetUserLogin} headerTop="visible" isLogin={isLogin}>
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Name</label>
                          <input type="text" onChange={(e)=>setName(e.target.value)} value={name} />
                        </div>
                      </div>
                      {/* <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input type="text" />
                        </div>
                      </div> */}
        
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Delivery option</label>
                          <select onChange={(e)=>setDeliverOption(e.target.value)} value={deliverOption}>
                            <option>Pickup</option>
                            <option>Home Delivery</option>
                          </select>
                        </div>
                      </div>
                    {deliverOption!=="Pickup"&&  <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Address</label>
                          <input
                          
                            className="billing-address"
                            placeholder="Address"
                            type="text"
                            onChange={(e)=>setAddress(e.target.value)} value={address}
                          />
                        </div>
                      </div>}
                      {/* <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input type="text" />
                        </div>
                      </div> */}
                      {/* <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input type="text" />
                        </div>
                      </div> */}
                      {/* <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input type="text" />
                        </div>
                      </div> */}
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input type="number" onChange={(e) => { if(e.target.value.length<=10)setPhone(e.target.value);}} value={phone} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input type="email" onChange={(e) => { setEmail(e.target.value);}} value={email}   />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          onChange={(e) => { setNote(e.target.value);}} value={note} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              // const discountedPrice = getDiscountPrice(
                              //   cartItem.price,
                              //   cartItem.discount
                              // );
                              const discountedPrice = cartItem.discountedPrice;
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.productName} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button onClick={placeOrder} className="btn-hover">Place Order</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
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

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeAllFromCart: () => {
      dispatch(removeAllFromCart());
    },
    decrementProduct: (newStock) => {
      dispatch(decrementProduct(newStock));
    },
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
