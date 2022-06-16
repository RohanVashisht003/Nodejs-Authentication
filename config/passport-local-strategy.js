const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');


passport.use(new localStrategy({
    usernameField:'email',
    passReqToCallback: true
},
(req,email, password, done)=>{
    // find a user and establish identity
    User.findOne({email:email},(err, user)=>{
        if(err){
            console.log("err",err);
            return done(err);
        }

        if(!user){
            req.flash('information','User not registered')
            console.log('error', 'User not registered');
            return done(null, false);
        }

        bcrypt.compare(req.body.password, user.password,(err,result)=>{
            if(result===true){
                return done(null, user);
            }
            else{
                req.flash('error','Invalid email/password')
                console.log('error','Invalid email/password')
                return done(null, false);
            }
        });
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

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

// verifying captcha
passport.captchaVerify = (req, res, next)=>{
    if (req.recaptcha.error) {
        req.flash('error','reCAPTCHA Incorrect/Try again');
        res.redirect('back');
    } else {
        return next();
    }
}
module.exports = passport;