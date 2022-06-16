const development={
    name:'development',
    session_cookie_key:'blabla',
    db:'authentication_development',
    smtp:{
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                 user:'sharmashubham2961@gmail.com',
                 pass:'nmdnjsclyblfdgbc'
            }
    },
    google_client_id:"936398041988-lhkrenb0avaqu5uo4s3btpongtbpdt4o.apps.googleusercontent.com",
    google_client_secret:"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",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    recaptcha_site_key: '6LdF83IgAAAAAPUsfVxfrrC-pwuSDhjh7RXsYNs1',
    recaptcha_secret_key:'6LdF83IgAAAAAGUbKyKO4X4vyue2KVUi8SrTUyLB'
}


const production={
    name:'production',
    session_cookie_key:process.env.AUTHENTICATION_SESSION_COOKIE_KEY,
    db:'authentication_development',
    smtp:{
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                 user: process.env.AUTHENTICATION_SMTP_USER,
                 pass:process.env.AUTHENTICATION_SMTP_PASS
            }
    },
    google_client_id:process.env.AUTHENTICATION_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.AUTHENTICATION_GOOGLE_CLIENT_SECRET,
    google_callback_url:process.env.AUTHENTICATION_GOOGLE_CALLBACK_URL ,
    recaptcha_site_key: process.env.AUTHENTICATION_RECAPTCHA_SITE_KEY,
    recaptcha_secret_key:process.env.AUTHENTICATION_SECRET_KEY
}

module.exports =eval(process.env.AUTHENTICATION_ENVIRONMENT)==undefined ? development:eval(process.env.AUTHENTICATION_ENVIRONMENT);