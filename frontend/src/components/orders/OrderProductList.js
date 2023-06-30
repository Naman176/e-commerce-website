
import React ,{Fragment} from "react";
import { connect } from "react-redux";
const imageURL = "http://localhost:9000/static/";
const OrderProductList = ({currency,orderedProducts}) => {
    // const orderedProducts = [
    //     {
    //         "_id": "61f149cb5c925a39ebcde2c3",
    //         "productID": 4,
    //         "productName": "product 5",
    //         "stock": 4,
    //         "category": [
    //             "strategy"
    //         ],
    //         "quantity":"1",
    //         "productType": "image",
    //         "price": 2000,
    //         "discountedPrice": 1500,
    //         "image": "1643203019134-881877155final logo.png",
    //         "__v": 0
    //     }
    // ];
    let TotalPrice = 0;
    return (
        <Fragment>
        <h3 className="cart-page-title">Items</h3>
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
                  </tr>
                </thead>
                <tbody>
                  {orderedProducts.map((product, key) => {
                 
                    const discountedPrice = product.discountedPrice;
                    // const discountedPrice = getDiscountPrice(
                    //   product.price,
                    //   product.discount
                    // );
                    const finalProductPrice = (
                      product.price * currency.currencyRate
                    ).toFixed(2);
                    const finalDiscountedPrice = (
                      discountedPrice * currency.currencyRate
                    ).toFixed(2);
                    let discount =100- (discountedPrice / product.price) * 100;
                    discount = Math.floor(discount);
                    discountedPrice != null
                      ? (TotalPrice +=
                          finalDiscountedPrice * product.quantity)
                      : (TotalPrice +=
                          finalProductPrice * product.quantity);
                    return (
                      <tr key={key}>
                        <td className="product-thumbnail">
                          {/* <Link
                            to={
                              process.env.PUBLIC_URL +
                              "/product/" +
                              product.id
                            }
                          > */}
                            <img
                              className="img-fluid"
                              src={
                                imageURL +
                                product.image
                              }
                              alt=""
                            />
                          {/* </Link> */}
                        
                          {/* <Link
                            to={
                              process.env.PUBLIC_URL +
                              "/product/" +
                              product.productID
                            }
                          > */}<div className="product-name">
                            {product.productName}
                          </div>
                          {/* </Link> */}
                          {product.selectedProductColor &&
                          product.selectedProductSize ? (
                            <div className="cart-item-variation">
                              <span>
                                Color: {product.selectedProductColor}
                              </span>
                              <span>
                                Size: {product.selectedProductSize}
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
                         
                        
                            <input
                              className="cart-plus-minus-box"
                              type="text"
                              value={product.quantity}
                              readOnly
                            />

                         
                        </td>
                        <td className="product-subtotal">
                          {discountedPrice !== null
                            ? currency.currencySymbol +
                              (
                                finalDiscountedPrice * product.quantity
                              ).toFixed(2)
                            : currency.currencySymbol +
                              (
                                finalProductPrice * product.quantity
                              ).toFixed(2)}
                        </td>

                       
                      </tr>
                    );
                  })}
                                <tr>
                                    <td colSpan={3} className="product-subtotal"><h4>Total</h4></td>
                                    <td> <h4>$ {TotalPrice}</h4></td>
                                </tr>
                </tbody>
              </table>
            </div>
          </div>
            </div>
            </Fragment>
    )
}
const mapStateToProps = state => {
    return {
      currency: state.currencyData
    };
  };

export default connect(mapStateToProps)(OrderProductList);