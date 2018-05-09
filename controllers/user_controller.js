const Users = require('../models/user_model')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

module.exports = {
    loginUser (req, res) {
        Users.findOne({
            username: req.body.username
        })
        .then(function(userData){
            if(!userData){
                res.status(400).json({
                    message: 'username is not registered',
                })
            }else{
                bcrypt.compare(req.body.password, userData.password, function(err, result){
                    if(!result){
                        res.json({
                            message: 'incorrect username or password'
                        })
                    }
                    else{
                        let token = jwt.sign({id: userData._id, username: userData.username}, process.env.SECRET)
                        res.json({
                            message: 'Success login',
                            token: token,
                            username: userData.username,
                            firstname: userData.firstname,
                            lastname: userData.lastname
                        })
                    }
                })
            }
        })
    }
}