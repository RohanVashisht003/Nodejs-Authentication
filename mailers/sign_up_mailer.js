const nodeMailer = require('../config/nodemailer');
exports.sendWelcomeMail = (user) => {
    let htmlString = nodeMailer.renderTemplate({
        user
    }, '/sign_up_mail.ejs');
    nodeMailer.transporter.sendMail({
        from: 'sharmashubham2961@gmail.com',
        to: user.email,
        subject: 'Welcome to Authentication App',
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }
        console.log("Mail delivered", info);
        return;
    });
}