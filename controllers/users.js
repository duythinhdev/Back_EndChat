const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
exports.userSignup = (req,res,next) =>{
    User.find({email:req.body.email}).exec().then(user =>{
        if(user.length >= 1)
        {
            return res.status(409).json({
                message: "mail exists",
            })
        }
        else {
            bcrypt.hash(req.body.password,10,(err,hash) =>{
                if(err)
                {
                    return res.status(500).json({
                        error: err
                    })
                }
                else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password:hash
                    })
                    user.save().then(
                        result =>{
                            res.status(200).json({
                                message: "user created",result
                            })
                        }
                    ).catch(err =>{
                        res.status(500).json({
                            error:err
                        })
                    });
                }
            })
        }

    })
}
exports.userLogins = (req,res,next) =>{
    User.find({email: req.body.email}).exec().then(users=>{
        if(users.length < 1)
        {
            res.status(404).json({
                message: "auth failed"
            })
        }
        bcrypt.compare(req.body.password,users[0].password,(err,result)=>{
            if(err)
            {
                res.status(401).json({
                    message: "auth failed"
                })
            }
            if(result){
                const token = jwt.sign({
                    email: users[0].email,
                    userId:  users[0]._id
                },"secret",{
                    expiresIn: "1h"
                    }
                )
                res.status(401).json({
                    message: "Auth success",
                    token:token
                })
            }
            res.status(401).json({
                message: 'Auth failed'
            })
        })
    }).catch(err =>{
        res.status(500).json({
            error:err
        })
    });
}
