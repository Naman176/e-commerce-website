import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, useHistory } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import Loading from "../../components/Loading";
import { useToasts } from "react-toast-notifications";

export default function NewCredsPage({
  location,
  SetUserLogin,
  isLogin,
  setToken,
}) {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { pathname } = location;
  const [user, setUser] = useState({
    password: "",
    reEnterPassword: "",
    token: localStorage.getItem("rtoken"),
  });

  const URL = "http://localhost:9000/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const saveCred = (e) => {
    e.preventDefault();
    console.log(setToken);
    const { password, reEnterPassword, token } = user;
    console.log(user);
    if (password && password === reEnterPassword && token) {
      setLoading(true);
      axios
        .post(`${URL}new-password`, user)
        .then((res) => {
          console.log("res", res, res.data.message);
          if (res.data.message) {
            addToast("Password changed Successfully", {
              appearance: "success",
              autoDismiss: true,
            });
            setLoading(false);
            history.push("/");
          } else {
            addToast("UServer side issue", {
              appearance: "error",
              autoDismiss: true,
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          addToast("wrong credentials or network error", {
            appearance: "warning",
            autoDismiss: true,
          });
        });
    } else if (!reEnterPassword || !password) {
      addToast("Please enter the Password", {
        appearance: "warning",
        autoDismiss: true,
      });
    } else if (password.length < 6) {
      addToast("Password length must be greater than equal to 6", {
        appearance: "warning",
        autoDismiss: true,
      });
    } else if (password != reEnterPassword) {
      addToast("Confirm Password doesnt match", {
        appearance: "warning",
        autoDismiss: true,
      });
    } else {
      addToast("Time out try again later!", {
        appearance: "warning",
        autoDismiss: true,
      });
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | New Password</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        New Password
      </BreadcrumbsItem>
      {loading && <Loading></Loading>}
      <LayoutOne
        headerTop="visible"
        SetUserLogin={SetUserLogin}
        isLogin={isLogin}
      >
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Nav variant="pills" className="login-register-tab-list">
                    <Nav.Item>
                      <Nav.Link eventKey="login">
                        <h4>Set New Password</h4>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <div className="login-form-container">
                    <div className="login-register-form">
                      <form>
                        <input
                          type="password"
                          name="password"
                          value={user.password}
                          placeholder="Password"
                          onChange={handleChange}
                          required
                        ></input>
                        <input
                          type="password"
                          name="reEnterPassword"
                          value={user.reEnterPassword}
                          placeholder="Re-Enter Password"
                          onChange={handleChange}
                          required
                        ></input>
                        <div className="button-box">
                          <button type="submit" onClick={saveCred}>
                            <span>Save</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
}
