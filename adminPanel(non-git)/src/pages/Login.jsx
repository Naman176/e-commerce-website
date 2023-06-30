import "../styles/addProductForm.css";
import { useState,useRef } from "react";
import { useNavigate  } from "react-router-dom";
import axios from 'axios';

// const URL = "https://infinite-sands-08332.herokuapp.com/";
const URL = "http://localhost:9000/";
const Login = ({SetUserLogin}) => {
    const history = useNavigate ()
    const [user, setUser] = useState({
        email:"",
        password: ""
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
        axios.post(`${URL}login-admin`, user, {
          withCredentials: true,
        })
        .then(res =>{
        // alert("hello");
          if(res&&res.data&&res.data.admindata){
            SetUserLogin(res.data.admindata)
            localStorage.setItem("user", JSON.stringify(res.data.admindata));
            setCookie("jwtoken", res.data.token);
            alert("Logged in successfully")
            // console.log(res.data);
            history('/');
          }
          else{
            alert("Server side issue")
          }
        }).catch(err=>{
          console.log(err);
          alert("wrong credentials or network error")
        })
      }

    return (
        <div className="addproductpage">
            <h1>Admin Login</h1>
            <form onSubmit={login}>
                <div className="row">
                    <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Email"></input>
                </div>
                <div>
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password"></input>
                </div>
            <div className="row">
                <button>Login</button>
            </div>
            </form>
        </div>
    );
}

export default Login;