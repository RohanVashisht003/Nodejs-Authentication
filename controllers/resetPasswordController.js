const ResetPasswordToken = require('../models/reset_password');
const User = require('../models/user');
const crypto = require('crypto');


module.exports.renderResetPasswordForm = (req, res) => {
    let token = req.params.token;

    ResetPasswordToken.findOne({
        accessToken: token
    }, (err, token) => {
        if (err) {
            console.log('error in db connections');
            return;
        }

        if (!token) {
            return res.send('<center><h1>Invalid Access Token</h1></center>');
        }

        if (!token.isValid) {
            return res.send('<center><h1>This token has expired</h1></center>')
        }

        return res.render('reset_password_form', {
            title: "Reset Password",
            accessToken: token.accessToken,
        })
    });

}

module.exports.resetPassword = (req, res) => {
    try {
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;
        let token = req.body.token;

        if (password !== confirmPassword) {
            console.log("confirm and password should be same");
            return res.redirect('/');
        }

        let resetToken = ResetPasswordToken.findOne({
            accessToken: token
        }).populate('user');

        if (!resetToken || !resetToken.user) {
            console.log("Reset token is invalid");
            return res.redirect('back');
        }
        resetToken.user.password = password;
        resetToken.isValid = false;
        resetToken.user.save();
        console.log("Password successfully changed");
        return res.redirect('/users/sign-in');
    } catch (err) {
        console.log("error in resetting password",err);
    }

}