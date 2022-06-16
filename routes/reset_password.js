const express = require('express');
const router = express.Router();
const resetPasswordController= require('../controllers/resetPasswordController');

// reset-password--------------------
router.get('/',resetPasswordController.renderEmailForm);

// validating email-id----------------
router.post('/email',resetPasswordController.validateUser);

//password-reset form------------------
router.get('/reset-form/:token',resetPasswordController.renderResetPasswordForm);

// reset password---------------------
router.post('/reset',resetPasswordController.resetPassword);


module.exports = router;
