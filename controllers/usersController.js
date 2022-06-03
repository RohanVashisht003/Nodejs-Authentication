const User = require('../models/user');


module.exports.signIn = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('user_signIn', {
        title: 'Sign-In'
    })
}


module.exports.signUp = (req, res) => {
    return res.render('user_signUp', {
        title: 'SignUp'
    })
}

// create user
module.exports.create = (req, res) => {
    try {
        if (req.body.password != req.body.confirm_password) {
            console.log("Password not matched");
            return res.redirect('back');
        }
        User.findOne({email: req.body.email},(err, user)=>{
            if(err){ 
                console.log("Error in finding user in signing Up");
                return;
            }
            if(!user){
                User.create(req.body,(err, user)=>{
                    if(err){
                        console.log("Error in singing Up user");
                        return;
                    }
                    console.log("User created successfully");
                    return res.redirect('/users/sign-in')
                });
            }
            else{
                return res.redirect('back');
            }
        });
    } catch (err) {
        console.log('error in creating user try again');
        return res.redirect('back');
    }
}

module.exports.createSession = (req, res)=>{
    
}