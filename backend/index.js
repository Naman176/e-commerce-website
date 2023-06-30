const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')
const adminRoutes = require('./routes/adminRoutes') 
const session = require('express-session');
const MongoSession = require("connect-mongodb-session")(session);
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require('path')
const app = express();
app.use('/static', express.static(path.join(__dirname, 'uploads')))
// app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
const UserModel = require('./models/user');
const mongoURI = "mongodb://localhost:27017/Curasso1";
// const fronendURL = "https://for-shops.vercel.app";
const fronendURL = "http://localhost:3000";
// app.use(cors({
//   origin: fronendURL,
//   credentials: true
// }));
app.use((req, res, next) => {
  const corsWhitelist = [
    "https://for-shops.vercel.app",
    "http://localhost:3000",
    "https://marketplace-two-chi.vercel.app",
    
  ];
  if(corsWhitelist.indexOf(req.headers.origin)!==-1){
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  }
  next();
});
const port =process.env.PORT|| 9000;

// database connection
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
// },()=>{
//     console.log("Schema started")
// })
// const URL = "mongodb+srv://forshop:forshop%40123@forshop.jgpxt.mongodb.net/Forshop?retryWrites=true&w=majority";
mongoose.connect(mongoURI,{ useNewUrlParser: true,  useUnifiedTopology: true });
// mongoose.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{console.log("Connected to db")});
// mongoose.connect('mongodb://localhost:27017/Forshop',{useNewUrlParser:true,useUnifiedTopology:true});
app.use(authRoutes);
app.use(adminRoutes);
app.use(orderRoutes);

// const store = new MognoSession({
//   uri: URL,
//   collection: "users",
// })

app.use(
  session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false
  })
)

app.get('/login', (req,res)=>{
  // res.setHeader('Set-Header', 'newUser=true');
  // res.cookie('newUser', false);
  res.cookie('isEmployee', true,{maxAge: 1000*60*60*24, secure: true, httpOnly: true});
  res.send('you got the cookies!');
});

app.get('/read-cookies', (req,res)=>{
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
})

// app.get('/', function(req,res){
//   res.sendFile(path.join(__dirname,'./public/form.html'));
// });

// app.get('*',(res)=>{
//   res.send('Hello');
// })


app.listen(port, () => {
  console.log(`BE started at port ${port}`);
});
