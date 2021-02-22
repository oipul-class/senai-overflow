const auth = require("./config/auth");
const jwt = require("jsonwebtoken");

const generateToken = (paylaod) => {
    return jwt.sign(
        paylaod, 
        auth.secret,
        {
        expiresIn: "1h" 
        }
        );
};

module.exports = {
    generateToken
}