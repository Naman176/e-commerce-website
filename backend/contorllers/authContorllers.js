const Admin = require('../Models/admin');
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  if(err.message === "Number Registered"){
    errors.email = "Number already registered";
  }
  if (err.code === 11000) {
    errors.email = 'that email is already registered';  
    return errors;
  }
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

const maxAge = 3*24*60*60;
const createToken = (id)=>{
    return jwt.sign({id},'abcd secret',{
        expiresIn: maxAge
    })
}

// module.exports.signup_get = (req,res)=>{
//     res.render('signup');
// }

// module.exports.login_get = (req,res)=>{
//     res.render('login');
// }

module.exports.signup_post = async (req, res) => {
  const {name,email,number,password,address} = req.body;
  
    try {
      const num = await User.findOne({number});
      if(num){
        const errors = handleErrors({message : "Number Registered"});
        res.status(400).json({ errors });
      }
      else{
        // const user = await User.create({name,email,number,password,address,date:new Date()});
        bcrypt.hash(password,12)
        .then(async hashedpassword=>{
          const user = await User.create({name,email,number,password: hashedpassword,address,date:new Date()});
          user.save();
          const token = createToken(user._id);
          console.log(token);
          res.cookie('jwtoken', token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(201).json({ user: user._id,token,userdata:user });
        }
      )}
    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
   
  }

module.exports.login_post = async (req, res) => {
  const { email,password } = req.body;

  try {
    const user = await User.login(email,password);
    const token =  createToken(user._id);
    console.log(token);
    // res.cookie('jwtoken', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id ,token,userdata:user});
    // console.log(user);
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
  
}

module.exports.admin_signup_post = async (req, res) => {
  const {name, number, email, password, shopName} = req.body;
  
  try {
      const num = await Admin.findOne({number});
      if(num){
          const errors = handleErrors({message : "Number Registered"});
          res.status(400).json({ errors });
      }
      else{
          const admin = await Admin.create({name,email,number,password,date:new Date(), shopName});
          const token = createToken(admin._id);
          console.log(token);
          res.cookie('jwtoken', token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(201).json({ admin: admin._id,token,admindata:admin });
          // res.status(201).json({ admin: admin._id,token});
      }
  }
  catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
  }
}

module.exports.admin_login_post = async (req, res) => {
  const { email,password } = req.body;

  try {
    const admin = await Admin.login(email,password);
    const token =  createToken(admin._id);
    console.log(token);
    res.status(200).json({ admin: admin._id ,token,admindata:admin});
    // res.status(200).json({ admin: admin._id ,token});
    console.log(admin);
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
  
}

module.exports.logout_get = (req, res) => {
  res.cookie('jwtoken', '', { maxAge: 1});
  res.redirect('/');
}