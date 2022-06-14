const queue = require('../config/kue');
const resetPasswordMailer = require('../mailers/reset_password_link_mailer');

queue.process('resetPassword_mails',(job, done)=>{
    console.log("resetPassword worker is processing a job",job.data);
    console.log(job);
    resetPasswordMailer.sendResetPasswordLink(job.data.resetToken,job.data.user);
    done();
})