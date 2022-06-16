const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/usersController');
const env = require('../config/environment');


// Recaptcha
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const SITE_KEY = env.recaptcha_site_key;
const SECRET_KEY = env.recaptcha_secret_key;
const recaptcha = new Recaptcha(SITE_KEY, SECRET_KEY, { callback: "cb" });


// sign-in route ----------------------------------
router.get('/sign-in',recaptcha.middleware.render, usersController.signIn);
// passport local login route
router.post('/create-session',recaptcha.middleware.verify,passport.captchaVerify, passport.authenticate('local', {failureRedirect: '/users/sign-in'}),usersController.createSession);
    

// sign-up route----------------------------------------
router.get('/sign-up',recaptcha.middleware.render, usersController.signUp);
// create user route
router.post('/create',recaptcha.middleware.verify,passport.captchaVerify, usersController.create);


// sign-out route--------------------------------------
router.get('/sign-out',usersController.destroySession);


// google-authentication-----------------------------------
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);
router.get('/auth/google',passport.authenticate('google',{scope:['email','profile']}));



// update-password route------------------------------------
router.get('/update-password-form',usersController.renderUpdatePasswordForm);
// update password
router.post('/update-password',usersController.updatePassword);









module.exports = router;