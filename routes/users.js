const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/usersController');

router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.get('/sign-out',usersController.destroySession);
router.get('/auth/google',passport.authenticate('google',{scope:['email','profile']}));
router.get('/update-password-form',usersController.renderUpdatePasswordForm);
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);

router.post('/create', usersController.create);
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/users/sign-in'
}),usersController.createSession);

router.post('/update-password',usersController.updatePassword);



module.exports = router;