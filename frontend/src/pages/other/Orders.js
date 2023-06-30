import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import React, { Fragment, useState,useEffect} from "react";
import MetaTags from "react-meta-tags";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import LayoutOne from './../../layouts/LayoutOne';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import axios from "axios";
import Order from './../../components/orders/Order';
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/actions/ordersActions";
import Loading from "../../components/Loading";
// const URL = "https://infinite-sands-08332.herokuapp.com/";
const URL = "http://localhost:9000/";

const Orders = ({user, isLogin, SetUserLogin,ordersArray }) => {
  const [orders, setOrders] = useState(ordersArray.reverse());
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  useEffect(() => {
    if(user&&user._id)
    {
      setLoading(true);
      axios.post(`${URL}getOrders`, { userID: user._id }).then(res => { setOrders(res.data); setLoading(false); let fn = fetchOrders(res.data); fn(dispatch); });
    }
  },[user])
    return (
        <Fragment>
      <MetaTags>
        <title>Flone | Orders </title>
        <meta
          name="description"
          content="Orders page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL +"Orders" }>
        Orders
        </BreadcrumbsItem>
            <LayoutOne SetUserLogin={SetUserLogin} headerTop="visible" isLogin={isLogin}>
          <Breadcrumb />
        {loading&&<Loading></Loading>}
          <div className="cart-main-area pt-90 pb-100">
          <div className="container">
         { orders.length!==0?<>
           <h3 className="cart-page-title">Your Orders </h3>
                {orders.map((order) => {
                  console.log(order);
             return (<Order key={order._id} data={order} />) ;
           })}
          </>:
            <div className="cart-main-area pt-90 pb-100">
                <div className="container">
                <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No Orders found <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
                </div>
                </div>}
                </div>
                </div> 
                </LayoutOne>

        </Fragment>
    );

}
const mapStateToProps = state => {
  return {
    ordersArray: state.ordersData.orders
  };
};

export default  connect(mapStateToProps)(Orders);