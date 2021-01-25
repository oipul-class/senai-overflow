const auth = require("./config/auth.json");
const jwt = require("jsonwebtoken");

const generateToken = (paylaod) => {
    return jwt.sign(
        paylaod, 
        auth.secret,
        {
        expiresIn: "1d" 
        }
        );
};

module.exports = {
    generateToken
}