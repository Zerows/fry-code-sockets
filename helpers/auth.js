
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const { secret } = config;
function auth(client, next) {
    // invalid token - synchronous
    console.log("Auth");
    try {
        let token = decodeHeader(client.handshake.query);
        decodedToken = jwt.verify(token, secret);
        return next();
    } catch (err) {
        
        return next(new Error({message: 'Invalid Token'}));
    }
}
function decodeHeader(headers){
    if(headers.token != undefined) {
        return headers.token
    }else{
        throw 'Missing token'
    }

}
module.exports = auth;