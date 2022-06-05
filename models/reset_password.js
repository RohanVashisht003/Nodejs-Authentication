const mongoose = require('mongoose');

const resetPasswordTokenScheme = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    accessToken:{
        type:String,
        required:true,
    },
    isValid:{
        type:Boolean,
        required:true
    }
},{
    timestamps:true
});

const ResetPasswordToken = mongoose.model('ResetPasswordToken',resetPasswordTokenScheme);

module.exports = ResetPasswordToken;