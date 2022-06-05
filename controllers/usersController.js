const User = require('../models/user');
const bcrypt = require('bcrypt');
module.exports.signIn = (req, res) => {
    // if (req.isAuthenticated()) {
    //     return res.redirect('/')
    // }
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
                    console.log("User created successfully",user);
                    return res.redirect('/users/sign-in')
                });
            } else {
                return res.redirect('back');
            }
        });
    } catch (err) {
        console.log('error in creating user try again');
        return res.redirect('back');
    }
}

module.exports.createSession = (req, res) => {
    return res.redirect('/');
}

module.exports.destroySession = (req, res) => {
    req.logout(req.user, (err) => {
        if (err) {
            return next(err);
        }
        console.log("User logged out")
        return res.redirect('/');
    });
}

module.exports.renderUpdatePasswordForm = (req, res) => {
    return res.render('update_password_form', {
        title: 'Update Password'
    });

}

module.exports.updatePassword = (req, res) => {
    let loggedInUser = req.user;
    if (req.body.newPassword !== req.body.confirmPassword) {
        console.log('Password and confirm password not matched');
        return res.redirect('back');
    }

    bcrypt.compare(req.body.oldPassword, loggedInUser.password, (err, result) => {
        if (result == true) {
            loggedInUser.password = req.body.newPassword;
            loggedInUser.save();
            console.log("Password updated successfully")
            return res.redirect('/');
        } else {
            console.log("old password is not correct");
            return res.redirect('back');
        }
    });

    
}