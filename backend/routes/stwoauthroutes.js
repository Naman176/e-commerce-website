const {Router} = require('express');
const {checkUser} = require('../middleware/authMiddleware');
const router = Router();
const authController = require('../contorllers/stwoauthcontroller');
const jwt = require('jsonwebtoken');
const User = require("../models/stwouser");
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

// router.get('/signup', authController.signup_get);
router.post('/stwo/signup', authController.signup_post);
// router.get('/login', authController.login_get);
router.post('/stwo/login',authController.login_post);
router.get('/stwo/logout', authController.logout_get);
router.post('/stwo/checkLogin', (req, res) => {
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
router.post('/stwo/updateDetails', async(req, res) => {
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

router.post('/stwo/reset-password',(req,res)=>{
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


router.post('/stwo/new-password',(req,res)=>{
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

module.exports = router;