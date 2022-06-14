const express = require('express');
const router = express.Router();
const resetPasswordController= require('../controllers/resetPasswordController');

router.get('/',resetPasswordController.renderEmailForm);
router.post('/email',resetPasswordController.validateUser);
router.get('/reset-form/:token',resetPasswordController.renderResetPasswordForm);

router.post('/reset',resetPasswordController.resetPassword);

module.exports = router;