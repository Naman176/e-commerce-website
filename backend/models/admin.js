const mongoose = require('mongoose');
const{isEmail} = require('validator');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
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
    date: {
        type:  Date
    },
    shopName:{
        type: String,
        unique: true,
        lowercase: true
    },
    resetToken:{
        type : String
    },
    expireToken:{
        type : Date
    }
});

adminSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

adminSchema.statics.login = async function(email,password){
    const admin = await this.findOne({email});
    if(admin){
        const auth = await bcrypt.compare(password,admin.password);
        if(auth){
            return admin;
        }
        throw Error('incorrect password');
    }
    throw Error('Wrong Admin credentials')
}

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;