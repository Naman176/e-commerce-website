import "../styles/addProductForm.css";
import { useState,useRef } from "react";
import { useNavigate  } from "react-router-dom";
import axios from 'axios';

// const URL = "https://infinite-sands-08332.herokuapp.com/";
const URL = "http://localhost:9000/";
const Register = () => {
    const history = useNavigate ()
    const [user, setUser] = useState({
        name:"",
        number: "",
        password: "",
        reEnterPassword:"",
        email:"",
        shopName:""
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
    const regist = (e) => {
        e.preventDefault();
        let emailPattern = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
        let emailPattern2 = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+\.[A-Za-z]+$/);
        let emailPattern3 = new RegExp(/^[a-zA-Z0-9]+\.+[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]/);
        const {name,email,number, password, reEnterPassword} = user
        if(email&&name && password && number.length===10 && (password===reEnterPassword)&&password.length>=6 && (emailPattern.test(email) || emailPattern2.test(email)|| emailPattern3.test(email))){
          axios.post(`${URL}signup-admin`, user)
          .then(res => {
            console.log(res);   
            if(res&&res.data&&res.data.admindata){
              alert("Registered successfully")
                }else{
                  alert("connect to internet")
                }
                history("/")
              })
          
        }else if(!email || !password || !number||!name){
            alert("Please fill all details")
        }
        else if(number.length!==10){
          alert("write a valid mobile number")
        }
        else if(password.length<6){
          alert("Password length must be greater than equal to 6")
        }
        else if(password!=reEnterPassword){
          alert("Password doesnt match")
        }
        else{
          alert("Please use right email");
        }
    }

    return (
        <div className="addproductpage">
            <h1>Admin Register</h1>
            <form onSubmit={regist}>
            <div className="row">
                <input type="text" name="name" value={user.name} placeholder="Full Name" onChange={handleChange} required></input>
            </div>
            <div className="row">
                <input type="text" name="email" value={user.email} placeholder="Email" onChange={handleChange} required></input>
            </div>
            <div className="row">
                <input type="phone" name="number" value={user.number} placeholder="Number" onChange={handleChange} required></input>
            </div>
            <div className="row">
                <input type="text" name="shopName" value={user.shopName} placeholder="Shop Name" onChange={handleChange} required></input>
            </div>
            <div className="row">
                <input type="password" name="password" value={user.password} placeholder="Password" onChange={handleChange} required></input>
            </div>
            <div className="row">
                <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-Enter Password" onChange={handleChange} required></input>
            </div>
            <div className="row">
                <button>Register</button>
            </div>
            </form>
        </div>
    );
}

export default Register;