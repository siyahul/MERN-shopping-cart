const jwt = require('jsonwebtoken')

exports.generateToken = user =>{
    return jwt.sign(
        {
            _id:user._id,
            name:user.name,
            password:user.password,
            isAdmin:user.isAdmin
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn:'30d',
        }
    );
};


exports.isAuth = (req, res, next)=>{
    const autherization = req.headers.autherization;
    if (autherization) {
      const token = autherization.slice(7, autherization.length);
      jwt.verify(
        token,
        process.env.JWT_SECRET || "somethingsecret",
        (err, decode) => {
          if (err) {
            res.status(400).json({ message: "invalid_token" });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).json({ message: "no token" });
    }
  };

  