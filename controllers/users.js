const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

 // const client = new OAuth2Client("585482924930-c758fq94e6ag9dlni35dpkedbh6dqesp.apps.googleusercontent.com");
exports.signup_user = (req, res, next) => {
    console.log("req",req.body.email,req.body.name)
    User.find({email: req.body.email}).exec().then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Mail exists'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    });
                    user.save().then(result => {
                            console.log(result)
                            res.status(201).json({
                                message: "User created",
                                result: result
                            })
                        }
                    ).catch(err => {
                            console.log(err)
                            res.status(500).json({
                                error: err
                            })
                        }
                    );
                }
            })
        }

    })
}
exports.login_user = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                console.log(user[0].email, user[0]._id);
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, "secret", {
                            expiresIn: "7d"
                        }
                    )
                    return res.status(401).json({
                        message: 'Auth success',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'Auth failed'
                })
            })
        })
        .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            }
        );
}

exports.delete_user = (req, res, next) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "User deleted"
            })
        })
        .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            }
        );
}

exports.googleLogin_user = (req, res, next) =>{
    console.log("12312312",req)
    const { tokenId } = req.body;
    client.verifyIdToken({tokenId,audience: "585482924930-c758fq94e6ag9dlni35dpkedbh6dqesp.apps.googleusercontent.com"}).then(response=>{
        const { email_verified,name,email } = response.payload;
        if(email_verified)
        {
            User.findOne({email}).exec(err,user => {
                if(err)
                {
                    return res.status(400).json({error:"Something went wrong ....."})
                }
                else{
                    if(user)
                    {
                        const token  = jwt.sign({_id: user.id},"secret",{ expiresIn: '7d'});
                        const { _id,name,email } = user;
                        res.json({
                            token,
                            user: { _id, name, email }
                        })
                    }else {
                        let password = email+"secret";
                        let newUser = new User({name,email,password})
                        newUser.save((err,data)=>{
                            if(err)
                            {
                                return res.status(400).json({
                                    error: "Something went wrong"
                                })
                            }
                            const token  = jwt.sign({_id: data.id},"secret",{ expiresIn: '7d'});
                            const { _id, name, email } = user;
                            res.json({
                                token,
                                user: { _id, name, email }
                            })
                        })
                    }
                }
            })
        }
        console.log("response",response.payload)
    })

}

exports.facebookLogin_user = (req, res, next) =>{
    const { userID,accessToken } = req.body;
}
