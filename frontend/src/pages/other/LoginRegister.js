import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link,useHistory } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from 'axios';
import Loading from "../../components/Loading";
import { useToasts } from 'react-toast-notifications';

// const URL = "https://infinite-sands-08332.herokuapp.com/";
const URL = "http://localhost:9000/";


const LoginRegister = ({ location, SetUserLogin, isLogin }) => {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  const { pathname } = location;
  const [user, setUser] = useState({
    name:"",
    number: "",
    password: "",
    reEnterPassword:"",
    email:"",
    address: ""
  })
  function setCookie(name,value) {
    var expires = "";
    expires = "; max-age=" + 3*24*60*60*1000;
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
  const handleChange = e => {
    const {name, value} = e.target
    setUser({
        ...user,
        [name]:value
    })
  }
  const login = (e) => {
    e.preventDefault();
    console.log(user);
    setLoading(true);
    axios.post(`${URL}login`, user, {
      withCredentials: true,
    })
    .then(res =>{
       
      setLoading(false);
      if(res&&res.data&&res.data.userdata){
        SetUserLogin(res.data.userdata)
        localStorage.setItem("user", JSON.stringify(res.data.userdata));
        setCookie("jwtoken", res.data.token);
        addToast("Logged in successfully",{
          appearance: "success",
          autoDismiss: true
        })
        console.log(res.data);
        history.goBack();
      }
      else{
        addToast("connect to internet",{
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
  const register = (e)=>{
    e.preventDefault();
    let emailPattern = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    let emailPattern2 = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+\.[A-Za-z]+$/);
    let emailPattern3 = new RegExp(/^[a-zA-Z0-9]+\.+[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]/);
    const {name,email,number, password, reEnterPassword} = user
    if(email&&name && password && number.length===10 && (password===reEnterPassword)&&password.length>=6 && (emailPattern.test(email) || emailPattern2.test(email)|| emailPattern3.test(email))){
      // alert("posted")
      setLoading(true);
      axios.post(`${URL}signup`, user)
      .then(res => {
        console.log(res);   
        setLoading(false);
        if(res.data&&res.data.user){
          SetUserLogin(res.data.userdata)
          localStorage.setItem("user", JSON.stringify(res.data.userdata));
          setCookie("jwtoken", res.data.token);
          addToast("Registered successfully",{
                appearance: "success",
                autoDismiss: true
              })
            }else{
              addToast("connect to internet",{
                appearance: "error",
                autoDismiss: true
              })
            }
            history.push("/")
          }).catch(err=>{
          setLoading(false);
          addToast("user already registered",{
         appearance: "warning",
          autoDismiss: true
        })
        })
      
    }else if(!email || !password || !number||!name){
        addToast("Please fill all details",{
           appearance: "warning",
            autoDismiss: true
        })
    }
    else if(number.length!==10){
      addToast("write a valid mobile number",{
            appearance: "warning",
            autoDismiss: true
        })
    }
    else if(password.length<6){
      addToast("Password length must be greater than equal to 6",{
            appearance: "warning",
            autoDismiss: true
        })
    }
    else if(password!=reEnterPassword){
      addToast("Password doesnt match",{
            appearance: "warning",
            autoDismiss: true
        })
    }
    else{
      addToast("Please use right email",{
           appearance: "warning",
            autoDismiss: true
        })
    }
  }
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      {loading&&<Loading></Loading>}
      <LayoutOne headerTop="visible" SetUserLogin={SetUserLogin} isLogin={isLogin}>
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={login}>
                            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Email"></input>
                            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password"></input>
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  {/* <input type="checkbox" />
                                  <label className="ml-10">Remember me</label> */}
                                  <Link to={process.env.PUBLIC_URL + "/forgotPassword"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit" >
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={register}>
                            {/* <input type="text" name="name" value={user.name} placeholder="Name" onChange={handleChange}></input> */}
                            <input type="text" name="name" value={user.name} placeholder="Full Name" onChange={handleChange} required></input>
                            <input type="text" name="email" value={user.email} placeholder="Email" onChange={handleChange} required></input>
                            <input type="phone" name="number" value={user.number} placeholder="Number" onChange={handleChange} required></input>
                            <input type="password" name="password" value={user.password} placeholder="Password" onChange={handleChange} required></input>
                            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-Enter Password" onChange={handleChange} required></input>
                            {/* <input type="address" name="address" value={user.address} placeholder="Address" onChange={handleChange}></input> */}
                              <div className="button-box">
                                <button type="submit" >
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object
};

export default LoginRegister;
