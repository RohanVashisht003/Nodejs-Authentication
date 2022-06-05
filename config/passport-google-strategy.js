const passport = require('passport');
const googleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/user');
const crypto = require('crypto');


passport.use(new googleStrategy({
    clientID:  "936398041988-lhkrenb0avaqu5uo4s3btpongtbpdt4o.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    passReqToCallback: true
},(req,accessToken,refreshToken,profile,done)=>{
    console.log(profile);
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){

        if(err){
            console.log('error in google-strategy-passport',err);
            return;
        }

        if(user){
            return done(null, user);
        }
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },(err, user)=>{
                if(err)
                {
                    console.log('error in google strategy-passport',err);
                    return;
            }

                return done(null,user);
            });
        }
    });
}));


module.exports = passport;