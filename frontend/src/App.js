import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy, useState } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect, useDispatch, useSelector } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { fetchProducts } from "./redux/actions/productActions";
import { useToasts } from "react-toast-notifications";
import Loading from "./components/Loading";
import ResetPage from "./pages/reset/ResetPage";
import NewCredsPage from "./pages/reset/NewCredsPage"

// shop page
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));

// product page
const Product = lazy(() => import("./pages/shop-product/Product"));


// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Orders = lazy(() => import("./pages/other/Orders"));
const OrderDetail = lazy(() => import("./pages/other/OrderDetail"));
const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));
// const URL = "https://infinite-sands-08332.herokuapp.com/";
const URL = "http://localhost:9000/";
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

const App = props => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json")
        }
      })
    );
  });

  const [user,SetUserLogin ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const { addToast } = useToasts();
  const fetchingErrorHandler = (err) => {
    addToast(err, {
      appearance: "warning",
      autoDismiss: true
    })
  }
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    fetch(`${URL}sone/getProducts`).then(
      res => {
        console.log(res);
        if (res.status == 400) {
          fetchingErrorHandler("Error while Fetching Products");
            }
            return res.json();
          }
          ).then(
            data => {
            setLoading(false);
            console.log(data);
            const fn = fetchProducts(data);
            fn(dispatch);
          }
        ).catch(err => {
          fetchingErrorHandler("Error while Fetching Products");
        });
    const cookie = getCookie("jwtoken");
    console.log(cookie);
    if (localStorage.getItem(user)) {
      SetUserLogin(JSON.parse(localStorage.getItem("user")));
    }
    else {
      setLoading(true);
      fetch(`${URL}checkLogin`,{method:"POST",body:JSON.stringify({"cookie":cookie}), headers: {
        'Content-Type': 'application/json'
      },}, {
        credentials: 'include'
      }).then((res) => {
        if (res.status == 400) {
          fetchingErrorHandler("Server not responding");
            }
        return res.json();
      }).then(data => {
        setLoading(false);
        // console.log(data);
        if (data.isLogin) {
          // console.log(data.userdata);
          if(data.userdata){
            SetUserLogin(data.userdata);
            localStorage.setItem("user", data.userdata);}
          }
        })
      }
    }, [])
    return (
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                {/* <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={HomeFashion}
                /> */}
                <Route exact path={process.env.PUBLIC_URL + "/orders"}>
                  {user ? (
                    <Orders
                      user={user}
                      isLogin={true}
                      SetUserLogin={SetUserLogin}
                    />
                  ) : (
                    <Orders isLogin={false} />
                  )}
                </Route>
                
                <Route exact path={process.env.PUBLIC_URL + "/"}>
                  {loading && <Loading></Loading>}
                  {user ? (
                    <ShopGridStandard
                      isLogin={true}
                      SetUserLogin={SetUserLogin}
                    />
                  ) : (
                    <ShopGridStandard
                      SetUserLogin={SetUserLogin}
                      isLogin={false}
                    />
                  )}
                </Route>
                
                <Route
                  path={process.env.PUBLIC_URL + "/Orderdetail/:id"}
                  render={(routeProps) => (
                    <OrderDetail
                      param={routeProps.match.params.id}
                      isLogin={user !== null}
                      key={routeProps.match.params.id}
                    />
                  )}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product/:id"}
                  render={(routeProps) => (
                    <Product {...routeProps} key={routeProps.match.params.id} />
                  )}
                />
                <Route exact path={process.env.PUBLIC_URL + "/about"}>
                  {user ? (
                    <About isLogin={true} location={"/about"} />
                  ) : (
                    <About isLogin={false} location={"/about"} />
                  )}
                </Route>

                <Route exact path={process.env.PUBLIC_URL + "/contact"}>
                  {user ? (
                    <Contact isLogin={true} location={"/contact"} />
                  ) : (
                    <Contact isLogin={false} location={"/contact"} />
                  )}
                </Route>
                <Route exact path={process.env.PUBLIC_URL + "/my-account"}>
                  {user ? (
                    <MyAccount
                      SetUserLogin={SetUserLogin}
                      user={user}
                      isLogin={true}
                      location={{ pathname: "/my-account" }}
                    />
                  ) : (
                    <MyAccount
                      SetUserLogin={SetUserLogin}
                      user={user}
                      isLogin={false}
                      location={{ pathname: "/my-account" }}
                    />
                  )}
                </Route>
                
                <Route exact path={process.env.PUBLIC_URL + "/login-register"}>
                  {user ? (
                    <LoginRegister
                      SetUserLogin={SetUserLogin}
                      isLogin={true}
                      location={{ pathname: "/login-register" }}
                    />
                  ) : (
                    <LoginRegister
                      SetUserLogin={SetUserLogin}
                      isLogin={false}
                      location={{ pathname: "/login-register" }}
                    />
                  )}
                </Route>

                <Route exact path={process.env.PUBLIC_URL + "/cart"}>
                  {user ? (
                    <Cart
                      SetUserLogin={SetUserLogin}
                      isLogin={true}
                      location={{ pathname: "/cart" }}
                    />
                  ) : (
                    <Cart
                      SetUserLogin={SetUserLogin}
                      isLogin={false}
                      location={{ pathname: "/cart" }}
                    />
                  )}
                </Route>

                <Route exact path={process.env.PUBLIC_URL + "/wishlist"}>
                  {user ? (
                    <Wishlist
                      SetUserLogin={SetUserLogin}
                      isLogin={true}
                      location={"/wishlist"}
                    />
                  ) : (
                    <Wishlist
                      SetUserLogin={SetUserLogin}
                      isLogin={false}
                      location={"/wishlist"}
                    />
                  )}
                </Route>

                <Route exact path={process.env.PUBLIC_URL + "/compare"}>
                  {user ? (
                    <Compare isLogin={true} location={"/compare"} />
                  ) : (
                    <Compare isLogin={false} location={"/compare"} />
                  )}
                </Route>

                {user !== null && (
                  <Route exact path={process.env.PUBLIC_URL + "/checkout"}>
                    {user ? (
                      <Checkout
                        user={user}
                        SetUserLogin={SetUserLogin}
                        isLogin={true}
                        location={{ pathname: "/checkout" }}
                      />
                    ) : (
                      <Checkout
                        SetUserLogin={SetUserLogin}
                        isLogin={false}
                        location={{ pathname: "/checkout" }}
                      />
                    )}
                  </Route>
                )}

                <Route exact path={process.env.PUBLIC_URL + "/forgotPassword"}>
                  {user ? (
                    <ResetPage isLogin={true} location={"/forgotPassword"}/>
                  ) : (
                    <ResetPage isLogin={false} location={"/forgotPassword"} setToken={setToken}/>
                  )}
                </Route>
                <Route exact path={process.env.PUBLIC_URL + "/setNewPassword2$29283bsoidfnefhwsfkwe"}>
                  {user ? (
                    <NewCredsPage isLogin={true} location={"/setNewPassword2$29283bsoidfnefhwsfkwe"}/>
                  ) : (
                    <NewCredsPage
                      isLogin={false}
                      location={"/setNewPassword2$29283bsoidfnefhwsfkwe"}
                      setToken={setToken}
                      token={token}
                    />
                  )}
                </Route>
                <Route exact path={process.env.PUBLIC_URL + "/not-found"}>
                  {user ? (
                    <NotFound isLogin={true} location={"/not-found"} />
                  ) : (
                    <NotFound isLogin={false} location={"/not-found"} />
                  )}
                </Route>

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
