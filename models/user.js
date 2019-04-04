const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    token:{
        type:String
    }
})


userSchema.pre('save',function(next){
    var user = this;
    bcrypt.genSalt(SALT_I,function(err,salt){
        if(err) return next(err)

        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);

            user.password = hash;
            //console.log(user.password);
            next();

        })
        //next();
    })
    
})



userSchema.methods.comparePassword = function(candidatePass,cb){
    
    bcrypt.compare(candidatePass,this.password,function(err,isMatch){
        if(err) throw cb(err)
        cb(null,isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
var user = this;
var token = jwt.sign(user._id.toHexString(),'supersecret');

user.token = token;

user.save(function(err,user){
if(err) return cb(err)
else
cb(null,user)
})
}


userSchema.statics.findByToken = function(token,cb){
    const user = this;
    jwt.verify(token,'supersecret',function(err,decode){
        user.findOne({"_id":decode,"token":token},function(err,user){
            if(err) return cb(err);
            
            cb(null,user);
        })
    })
}

const User = mongoose.model('User',userSchema);

module.exports = {User}