const jwt = require('jsonwebtoken');

module.exports = generateToken;


function generateToken(user) {
    const payload = {
      username: user.username,
      subject: user.id
    };
  
    const secret = 'is it secret? is it safe?';
  
    const options = {
      expiresIn: '1h'
    };
  
    return jwt.sign(payload, secret, options)
  }