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
                bcryptjs.compare(req.body.password, userData.password, function(err, result){
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
    },
    registerUser (req, res) {
        var regexUsername = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let password = req.body.password;
        let letter = /[a-zA-Z]/;
        let number = /[0-9]/;
        let goodPassword = letter.test(password) && number.test(password);
        let role = 'user';
        if(password.length < 6){
            res.json({
                message: 'Password too short!'
            })
        }else if(!goodPassword){
            res.json({
                message: 'Password must be alphanumeric'
            })
        }else if(!regexUsername.test(req.body.username)){
            res.json({
                message: 'Username must be email'
            })
        }else{
            users.findOne({
                username: req.body.username
            })
            .then(function(userData){
                if(userData != null){
                    res.status(400).json({
                        message: "username has been taken!",
                    })
                }else{
                    let salt = bcrypt.genSaltSync(saltRounds)
                    let hash = bcrypt.hashSync(password, salt);
                        users
                        .create({
                            username: req.body.username,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            password: hash,
                            role: role,
                        })
                        .then(function(result){
                            res.status(200).json({
                                message: "success register a new user",
                                result: result
                            })
                        })
                    }
                })
            .catch(function(err){
                res.status(500).json({
                    message: err
                })
            })
        }
    }
}