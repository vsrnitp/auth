const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();


mongoose.Promise = global.Promise;
mongoose.connect('*********************************')

const {User} = require('./models/user');
const {auth} = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/user',(req,res)=>{
const user = new User({
email:req.body.email,
password:req.body.password
});



user.save((err,doc)=>{
    if(err) res.status(400).send(err)

    res.status(200).send(doc)
})


})

app.post('/api/user/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) res.json({message:'authFailed,user not found!!!!!'})
       else{
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(err) throw err;
            if(!isMatch) return res.status(400).json({
                message:'wrong password'
            });

            user.generateToken((err,user)=>{
                if(err) return res.status.send(err)
                res.cookie('auth',user.token).send('ok')
            })
        })
    }
    })
});

app.get('/user/profile',auth,(req,res)=>{
   
res.status(200).send(req.token);
    

})






const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})
