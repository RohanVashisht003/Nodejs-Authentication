const express = require('express');
const router = express.Router();
const resetPasswordController= require('../controllers/resetPasswordController');


router.get('/password-reset-form/:token',resetPasswordController.renderResetPasswordForm);
router.post('/update-password',resetPasswordController.resetPassword);

module.exports = router;