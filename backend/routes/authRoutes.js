const {Router} = require('express');
const router = Router();
const authController = require('../contorllers/authContorllers');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const Admin = require('../Models/admin');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { json } = require('express/lib/response');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "curassocurasso@gmail.com",
        pass: "Curasso@10"
    }
})

router.post('/signup-admin', authController.admin_signup_post)
router.post('/login-admin', authController.admin_login_post)
router.post('/signup', authController.signup_post);
router.post('/login',authController.login_post);
router.get('/logout', authController.logout_get);
router.post('/checkLogin', (req, res) => {
    const token = req.body.cookie;
    console.log("token", token);
    if (token) {
        jwt.verify(token, "abcd secret", async (err, decodedToken) => {
            console.log("dt",decodedToken);
        if (err) {
            res.json({ isLogin: false });
        } else {
          let user = await User.findById(decodedToken.id);
          res.json({isLogin:true,userID:user,userdata:user})
        }
      });
    } else {
        res.json({ isLogin: false });
    }
  
})
router.post('/updateDetails', async(req, res) => {
    let details = await User.findById(req.body._id);
    let newDetails = req.body;
    console.log(details);
    details.name = newDetails.name;
    details.email = newDetails.email;
    details.address = newDetails.address;
    details.number = newDetails.number;
    let replacementobj = { name: details.name, email: details.email, address: details.address, number: details.number ,password:details.password};
    console.log("d",replacementobj);
    let d = await User.findOneAndReplace({"_id":details._id}, replacementobj);
    console.log(d);
    res.json(d);
})

router.post('/reset-password',(req,res)=>{
    console.log(req.body);
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                const mailOptions = {
                    to:user.email,
                    from:"no-replay@curasso.com",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/setNewPassword2$29283bsoidfnefhwsfkwe">link</a> to reset password</h5>`
                }
                transporter.sendMail(mailOptions, function (err, info) {
                    if(err)
                      console.log(err)
                    else
                      console.log(info);
                 });
                res.json({message:"check your email", token:user.resetToken})
            })

        })
    })
})

router.post('/reset-password-admin',(req,res)=>{
    console.log(req.body);
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        Admin.findOne({email:req.body.email})
        .then(admin=>{
            if(!admin){
                return res.status(422).json({error:"Admin dont exists with that email"})
            }
            admin.resetToken = token
            admin.expireToken = Date.now() + 3600000
            admin.save().then((result)=>{
                const mailOptions = {
                    to:admin.email,
                    from:"no-replay@curasso.com",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/setNewPassword2$29283bsoidfnefhwsfkwe">link</a> to reset password</h5>`
                }
                transporter.sendMail(mailOptions, function (err, info) {
                    if(err)
                      console.log(err)
                    else
                      console.log(info);
                 });
                res.json({message:"check your email", token:admin.resetToken})
            })

        })
    })
})

router.post('/new-password',(req,res)=>{
   const newPassword = req.body.password
   const sentToken = req.body.token
   User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
   .then(user=>{
       if(!user){
           return res.status(422).json({error:"Try again session expired"})
       }
       bcrypt.hash(newPassword,12).then(hashedpassword=>{
          user.password = hashedpassword
          user.resetToken = undefined
          user.expireToken = undefined
          user.save().then((saveduser)=>{
              res.json({message:"password updated success"})
          })
       })
   }).catch(err=>{
       console.log(err)
   })
})

router.post('/new-password-admin',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    Admin.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(admin=>{
        if(!admin){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           admin.password = hashedpassword
           admin.resetToken = undefined
           admin.expireToken = undefined
           admin.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
 })

module.exports = router;