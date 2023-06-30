import PropTypes from "prop-types";
import React from "react";
import { Link,useHistory } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { removeFromCart } from "../../redux/actions/cartActions";
import { render } from "react-dom";
import axios from 'axios';
import { useToasts } from "react-toast-notifications";
// const URL = "https://infinite-sands-08332.herokuapp.com/";
const URL = "http://localhost:9000/";
const IconGroup = ({
  isLogin,
  SetUserLogin,
  currency,
  cartData,
  wishlistData,
  compareData,
  removeFromCart,
  iconWhiteClass
}) => {
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const history = useHistory()
  const {addToast}=useToasts();
  const Logout = ()=>{
    // axios.get(`${URL}logout`,{
      //   withCredentials: true,
      // })
      // .then(res =>{
        //     alert("Logout Successful")
        //     SetUserLogin(null)
        //     console.log(res.data);
        //     history.push("/")
        // })
       
        localStorage.removeItem("user");
        SetUserLogin(null)
        document.cookie = "jwtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        addToast('logged out successfully',{
          appearance:"success",
          autoDismiss:true
        })
        history.push("/")
  }
  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      {/* <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={e => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div> */}
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={e => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        {/* {tog} */}
        <div className="account-dropdown">
          <ul>
            <li>
              {!isLogin && <Link to={process.env.PUBLIC_URL + "/login-register"}>Login/Register</Link>}
            </li>
            {/* <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>
                Register
              </Link>
            </li> */}
            <li>
              { isLogin&&<Link to={process.env.PUBLIC_URL + "/my-account"}>
                my account
              </Link>}
            </li>
            <li onClick={Logout}>
              {isLogin && <Link to={process.env.PUBLIC_URL + "/"}>
                Log Out
              </Link>}
            </li>
          </ul>
        </div>
      </div>
      <div className="same-style header-compare">
        {/* <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareData && compareData.length ? compareData.length : 0}
          </span>
        </Link> */}
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={e => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          isLogin={isLogin}
          cartData={cartData}
          currency={currency}
          removeFromCart={removeFromCart}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  removeFromCart: PropTypes.func,
  wishlistData: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: (item, addToast) => {
      dispatch(removeFromCart(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
