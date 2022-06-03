const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: "String",
        required: true,
        unique: true
    },
    password: {
        type: "String",
        required: true
    },
    name: {
        type: "String",
        required: true
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);

});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}


const User = mongoose.model('User', userSchema);
module.exports = User;