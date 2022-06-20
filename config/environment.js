// '####'--> use your credentials

const development={
    name:'development',
    session_cookie_key:'####',
    db:'authentication_development',
    smtp:{
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                 user:'####',
                 pass:'####'
            }
    },
    google_client_id:"####",
    google_client_secret:"####",
    google_callback_url: "####",
    recaptcha_site_key: '####',
    recaptcha_secret_key:'####',
    mongo_atlas:'####',
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
    recaptcha_secret_key:process.env.AUTHENTICATION_SECRET_KEY,
    mongo_atlas:process.env.AUTHENTICATION_MONGO_ATLAS_URL,
}

module.exports =eval(process.env.AUTHENTICATION_ENVIRONMENT)==undefined ? development:eval(process.env.AUTHENTICATION_ENVIRONMENT);
