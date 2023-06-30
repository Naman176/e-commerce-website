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


export default function ResetPage({ location, SetUserLogin, isLogin, setToken }) {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false); 
  const history = useHistory() 
  const { pathname } = location;
    const [user, setUser] = useState({
      email:""
    })
    const URL = "http://localhost:9000/";

    const handleChange = e => {
      const {name, value} = e.target
      setUser({
          ...user,
          [name]:value
      })
    }
    const forgot = (e) => {
      e.preventDefault();
      console.log(user);
      setLoading(true);
      axios.post(`${URL}reset-password`, user, {
        withCredentials: true,
      }).then(res =>{
        setLoading(false);
        if(res.data.message){
          console.log(res.data.token);
          localStorage.setItem("rtoken", res.data.token);
          setToken(res.data.resetToken);
          addToast("Check your Email",{
            appearance: "success",
            autoDismiss: true
          })
          // alert(res.data.message)
          
        }
        else{
          addToast("User does not exist",{
            appearance: "error",
            autoDismiss: true
          })
        }
      }).catch(err=>{
        setLoading(false);
        console.log(err);
        addToast("wrong credentials or network error",{
          appearance: "warning",
          autoDismiss: true
        })
      })
    }

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Forgot Password</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Forgot Password
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
                        <h4>Forgot Password</h4>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <div className="login-form-container">
                    <div className="login-register-form">
                      <form>
                      <input type="text" name="email" value={user.email} placeholder="Email" onChange={handleChange} required></input>

                        <div className="button-box">
                          <button type="submit" onClick={forgot}>
                            <span>Reset Password</span>
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
