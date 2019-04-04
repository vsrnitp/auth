const {User} = require('../models/user');

let auth = (req,res,next) => {
    let token = req.cookies.auth;
    //console.log(token);
    User.findByToken(token,(err,user)=>{
        if(err) throw (err);
else{
    if(!user) return res.status(401).send('no access')

    else
        req.token = token;
        next();
}
        //

    })
    
}

module.exports = {auth}