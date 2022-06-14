const queue = require('../config/kue');
const updatePasswordMailer = require('../mailers/update_password_mailer');

queue.process('updatePassword_mails',(job, done)=>{
    console.log("signUpEmail worker is processing a job",job.data);
    console.log(job);
    updatePasswordMailer.sendPasswordUpdateMail(job.data.user);
    done();
})