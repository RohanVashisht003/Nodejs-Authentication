const nodeMailer = require('../config/nodemailer');

// send update password mail
exports.sendPasswordUpdateMail =(user) =>{
    let htmlString = nodeMailer.renderTemplate({user:user},'/update_password_mail.ejs');
    nodeMailer.transporter.sendMail({
        from: 'sharmashubham2961@gmail.com',
        to: user.email,
        subject:`${user.name}, your password has just been updated`,
        html: htmlString

    }, (err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        
        console.log('Mail delivered',info);
        return;


    });
}
