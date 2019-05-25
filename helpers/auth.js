
const jwt = require('jsonwebtoken');
const config = require('../config.json');
var cookie = require('cookie')
const { secret } = config;
function auth(client, next) {
    // invalid token - synchronous
    console.log("Auth");
    try {
        let token = decodeCookie(client.handshake.headers.cookie)
        decodedToken = jwt.verify(token, secret);
        return next();
    } catch (err) {
        console.log(err);
        return next(new Error({message: err}));
    }
}
function decodeCookie(cookieString){
    let cookies = cookie.parse(cookieString)
    if(cookies['ember_simple_auth-session'] != undefined) {
      let authData = JSON.parse(cookies['ember_simple_auth-session']);
      return authData.authenticated.token;
    }else{
        throw 'Missing token'
    }

}
module.exports = auth;
