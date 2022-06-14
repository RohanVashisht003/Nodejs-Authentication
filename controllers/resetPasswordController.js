const ResetPasswordToken = require('../models/reset_password');
const User = require('../models/user');
const crypto = require('crypto');
const resetPasswordWorker = require('../workers/reset_password_mail_worker');
const queue = require('../config/kue');


module.exports.renderEmailForm = async (req, res)=>{
    try{
        return res.render('reset_password_email',{
            title:'Reset Password'
        })
    }
    catch(err){
        req.flash('error',err);
        console.log('error',err);
        return res.redirect('back');
    }
}

module.exports.validateUser = async(req, res)=>{ 
    try{
        const email = req.body.email;

        console.log('email is', email);
        User.findOne({email:email}).exec((err,user)=>{
            if(err){
                console.log('error in finding user',err);
                return;
            }
            if(user){
                ResetPasswordToken.create({
                    user:user,
                    accessToken:crypto.randomBytes(20).toString('hex'),
                    isValid:true
                },(err,resetToken)=>{
                    // ResetPasswordLinkMailer.sendResetPasswordLink(resetToken,user);

                    let job = queue.create('resetPassword_mails',{
                        resetToken:resetToken,
                        user:user
                    }).save(function(err){
                        if(err){
                            console.log(err, 'error in creating queue');
                            return;
                        }
                        console.log('job enqueued',job.id);
                    })
                    req.flash('success','A link to reset password has been send to your mail');
                    console.log("A link to reset password has been send to your mail");
                    return res.redirect('/users/sign-in');
                });
            }
            else{
                req.flash('error','No account exists with this email')
                console.log('no account exists with this email');
                return res.redirect('/users/sign-up')
            }
        });
    }
    catch(err){
        req.flash('error','error in validating user');
        console.log('error in validating user',err);
    }
}

module.exports.renderResetPasswordForm = async(req, res) => {
    let token = req.params.token;

    ResetPasswordToken.findOne({
        accessToken: token
    }, (err, token) => {
        if (err) {
            req.flash('error',err);
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

module.exports.resetPassword = async(req, res) => {
    try {
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;
        let token = req.body.token;

        if (password !== confirmPassword) {
            req.flash('error','confirm password and password should be same');
            console.log("confirm and password should be same");
            return res.redirect('back');
        }

        let resetToken = await ResetPasswordToken.findOne({
            accessToken: token
        }).populate('user');
        console.log("resetToken",resetToken)

        if (!resetToken || !resetToken.user) {
            req.flash('error','Token is invalid');
            console.log("Reset token is invalid");
            return res.redirect('back');
        }
        resetToken.user.password = password;
        resetToken.isValid = false;
        resetToken.user.save();
        req.flash('success','Password successfully changed');
        console.log("Password successfully changed");
        return res.redirect('/users/sign-in');
    } catch (err) {
        req.flash('error','error in resetting password');
        console.log("error in resetting password",err);
    }

}