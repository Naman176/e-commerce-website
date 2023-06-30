import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import LayoutOne from './../../layouts/LayoutOne';

import { Button } from 'react-bootstrap';
import Order from './../../components/orders/Order';
import OrderStatus from "../../components/orders/OrderStatus";
import OrderProductList from "../../components/orders/OrderProductList";
import CustomerDetail from "../../components/orders/CustomerDetails";
import { Link,useHistory } from "react-router-dom";
import { connect } from "react-redux";
import NotFound from "./NotFound";
const OrderDetail = ( props) => {
  const orderDetail = props.orders.find(data => data._id === props.param);
  console.log(orderDetail);
  const history = useHistory();
  if (orderDetail === undefined) {
    return <NotFound isLogin={true} location={{pathname:"/not-found"}}/>;
  }
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
      <BreadcrumbsItem to={process.env.PUBLIC_URL +"/Orders" }>Orders</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL +"OrderDetail"+props.param }>{props.param}</BreadcrumbsItem>
            <LayoutOne headerTop="visible" isLogin={props.isLogin}>
          <Breadcrumb />
          <div className="cart-main-area pt-90 pb-100">
          <div className="container">
          <>
           <h2 className="cart-page-title">Your Order</h2>
           
                    <OrderStatus id={orderDetail._id} deliverOption={orderDetail.deliverOption} status={orderDetail.status} ></OrderStatus>
                <OrderProductList orderedProducts={orderDetail.products} />
                <CustomerDetail orderDetail={orderDetail}/>
          </>
           
                </div>
                </div>
              
               
                </LayoutOne>

        </Fragment>
   )
}
const mapStateToProps = state => {
  return {
    orders: state.ordersData.orders
  };
};
export default connect(mapStateToProps)(OrderDetail);