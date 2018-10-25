const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET || 'SECRET'

function authorize(token) {
 return new Promise(function(fullfil, reject){
 jwt.verify(token, SECRET, function (err, user) {
    if (err) {
      fullfil(false);
    } else {
      fullfil(user);
    }
  });
  });
}

const checkAdmin = (req,res,next) => {
authorize(req.headers.authorization.split(' ')[1]).then((user)=>{
    if (user) {
      User.findById({_id:user.id}).then((info) => {
      if(info.role==='admin')
        next();
       else
        res.status(401).send('you are not authorize to access this resource');
      })
          .catch((err) => {
        res.status(500).send('something went wrong');
         })
    }
  });
}

module.exports = checkAdmin