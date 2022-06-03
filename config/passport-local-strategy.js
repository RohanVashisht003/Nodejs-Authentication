const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt')
passport.use(new localStrategy({
    usernameField:'email',
    passReqToCallback: true
},
(req,email, password, done)=>{
    // find a use and establish identity
    User.findOne({email:email},(err, user)=>{
        if(err){
            console.log("err",err);
            return done(err);
        }
        if(!user){
            console.log('error', 'Invalid/email/password');
            return done(null, false);
        }
        bcrypt.compare(req.body.password, user.password,(err,result)=>{
            if(result===true){
                console.log("User logged in")
                return done(null, user);
            }
            else{
                console.log('error','Invalid email/password')
                return done(null, false);
            }
        });
        // let result = User.comparePassword(req.body.password);
        // if(result==true){
        //     console.log('Sign in successful');
        //     return done(null,user);
        // }
        // else{
        //     console.log('error','Invalid email/password');
        //     return done(null, false);
        // }
        
    });
}
));

passport.serializeUser((user,done)=>{
    done(null, user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err, user)=>{
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;