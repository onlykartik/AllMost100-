const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader;
      jwt.verify(token, secret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  
  
  const adminAuthenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader;
      jwt.verify(token, secret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        const {username, passcode} =  user;
  
        require("./sql_connection").query(`select * from admincredentials`).then((data) => {
          req.user = user;
          const isUserAdmin = data.find((user) => {
            return user.USER == username && user.PASSWORD == passcode;
          });
          if(isUserAdmin){
          next();
          }
          else{
            res.sendStatus(401);
          }
        });
      });
  
  
    } else {
      res.sendStatus(401);
    }
  };
  
module.exports ={
    authenticateJwt,
    adminAuthenticateJwt
}