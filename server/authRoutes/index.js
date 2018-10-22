const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('../config/passport')
const SECRET = process.env.SECRET || 'SECRET'
const handlelogin = require('./login/handlers/handlePostLogin')
const handlePostRegister = require('./register/handlers/handlePostRegister')
function authorize(req,res,next){
    jwt.verify(req.token,SECRET,function(err,token){
        if(err){
            console.log(err);
            res.json({success: false, message: 'Not authorize to access this resource'})
        }else{
            next();
        }
    });
}

router.post('/login/', passport.authenticate('local', { session: false }), handlelogin)
router.post('/register/', handlePostRegister)

module.exports = router
