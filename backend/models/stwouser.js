const mongoose = require('mongoose')
const {isEmail} = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Enter your name"],
        trim: true,
    },
    number: {
        type: String,
        required: [true,"Please enter a valid number"],
        unique: true,
        minlength:[10,'Number must be 10 digits'],
        maxlength:[10,'Number must be 10 digits']
    },
    email: {
        type: String,
        unique:true,
        required: [true,"please enter a email"],
        lowercase: true,
        validate: [isEmail,"Please enter a valid mail"]
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minlength: [6,'Minimum Length is 6 character']
    },
    address:{
        type: String,
        trim: true
    },
    date: {
        type:  Date
    },
    resetToken:{
        type : String
    },
    expireToken:{
        type : Date
    }
});

// userSchema.post('save', function(doc, next){
//     console.log(`new user was created & saved`, doc)
//     next();
// });

// userSchema.pre('save', async function(next){
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('Username or Email not registered');
}

const User = mongoose.model('usertwo', userSchema);

module.exports = User;