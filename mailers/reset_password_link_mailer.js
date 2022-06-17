// '####' --> use your credentials


const nodeMailer = require('../config/nodemailer');


exports.sendResetPasswordLink = (resetPasswordToken, user)=>{
    let htmlString = nodeMailer.renderTemplate({resetPasswordToken:resetPasswordToken,user:user},'/reset_password_link.ejs');

    nodeMailer.transporter.sendMail({
        from:'####',
        to:user.email,
        subject:'Reset Password',
        html:htmlString
        
    }, (err, info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Mail delivered', info)
        return;
    });
}
