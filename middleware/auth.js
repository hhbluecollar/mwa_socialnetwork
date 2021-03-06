const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token'); 
 // console.log(token);
  if (!token) return res.status(401).json({message:'Access denied. No token provided.'});

  try {
    //verify the token with the private key
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));   
    req.user = decoded; 
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}

