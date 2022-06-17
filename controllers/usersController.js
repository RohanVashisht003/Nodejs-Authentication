const User = require('../models/user');
const bcrypt = require('bcrypt');
const signUpMailer = require('../mailers/sign_up_mailer');
const updatePasswordMailer = require('../mailers/update_password_mailer');
const signUpWorker = require('../workers/sign_up_mail_worker');
const updatePasswordWorker = require('../workers/update_password_mail_worker');
const queue = require('../config/kue')

// rendering sign-in page 
module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return res.render('user_signIn', {
        title: 'Sign-In',
        recaptcha: res.recaptcha
    })
}

// rendering sign-up page
module.exports.signUp = (req, res) => {
    return res.render('user_signUp', {
        title: 'SignUp',
        recaptcha:res.recaptcha
    })
}

// creating user
module.exports.create = (req, res) => {
    try {
        if (req.body.password != req.body.confirm_password) {
            req.flash('error','confirm password and password should be same');
            console.log("Password not matched");
            return res.redirect('back');
        }
        User.findOne({
            email: req.body.email
        }, (err, user) => {
            if (err) {
                console.log("Error in finding user in signing Up");
                return;
            }
            if (!user) {
                User.create(req.body, (err, user) => {
                    if (err) {
                        console.log("Error in singing Up user");
                        return;
                    }
                    // signUpMailer.sendWelcomeMail(user);

                    let job = queue.create('signup_mails', {
                       user:user
                        }).save(function(err){
                        if(err){
                            console.log(err, 'error in creating queue');
                            return;
                        }
                        console.log('job enqueued',job.id);
                    });

                    req.flash('success','User created successfully');
                    console.log("User created successfully", user);
                    return res.redirect('/users/sign-in')
                });
            }
//             if user already exists
            if(user) {
                req.flash('information','User already exist');
                console.log("User already exist")
                return res.redirect('back');
            }
        });
    } catch (err) {
        req.flash('error','Error in creating user');
        console.log('error in creating user try again');
        return res.redirect('back');
    }
}

// logging in user
module.exports.createSession = (req, res) => {
    req.flash('success','User logged in!!');
    console.log("User logged in");
    return res.redirect('/');
}

// logout user
module.exports.destroySession = (req, res) => {
    req.logout(req.user, (err) => {
        if (err) {
            return next(err);
        }
        req.flash('success','User logged out');
        console.log("User logged out")
        return res.redirect('/');
    });
}

// rendering update password form
module.exports.renderUpdatePasswordForm = (req, res) => {
    if(req.isAuthenticated()){
        return res.render('update_password_form', {
            title: 'Update Password'
        });
    }
    req.flash('success','Session timed out');
    return res.redirect('/');
}

// updating the password
module.exports.updatePassword = (req, res) => {
    let loggedInUser = req.user;
    if (req.body.newPassword !== req.body.confirmPassword) {
        req.flash('error','Password and confirm password not matched');
        console.log('Password and confirm password not matched');
        return res.redirect('back');
    }

    bcrypt.compare(req.body.oldPassword, loggedInUser.password, (err, result) => {
        if (result == true) {
            loggedInUser.password = req.body.newPassword;
            loggedInUser.save();
            // updatePasswordMailer.sendPasswordUpdateMail(loggedInUser);
            let job = queue.create('updatePassword_mails', {
                user:loggedInUser
                 }).save(function(err){
                 if(err){
                     console.log(err, 'error in creating queue');
                     return;
                 }
                 console.log('job enqueued',job.id);
             });
            req.flash('success','Password updated successfully');
            console.log("Password updated successfully")
            return res.redirect('/');
        } else {
            req.flash('error','Enter correct old password');
            console.log("old password is not correct");
            return res.redirect('back');
        }
    });


}
