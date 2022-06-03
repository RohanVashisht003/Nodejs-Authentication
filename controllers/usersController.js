module.exports.signIn = (req, res)=>{
    return res.render('user_signIn',{
        title:'Sign-In'
    })
}


module.exports.signUp = (req, res)=>{
    return res.render('user_signUp',{
        title:'SignUp'
    })
}