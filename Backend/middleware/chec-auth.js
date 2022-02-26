const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    console.log('req.headers.authorization',req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'secret_key_will_be_longer');
    next()
  } catch (error) {
    res.status(401).json({
      message: 'Auth failed!!'
    })
  }

}
