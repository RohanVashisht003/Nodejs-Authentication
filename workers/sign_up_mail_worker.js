const queue = require('../config/kue');
const signUpMailer = require('../mailers/sign_up_mailer');

queue.process('signup_mails',(job, done)=>{
    console.log("signUpEmail worker is processing a job",job.data);
    console.log(job)
    signUpMailer.sendWelcomeMail(job.data.user);
    done();
})