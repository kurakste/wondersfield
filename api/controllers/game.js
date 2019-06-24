const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.get_init_game = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length) {
                return res.status(409).json({ 
                   message: 'Email exist' 
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(), 
                            email: req.body.email,
                            password: hash
                        });  
                        user.save()
                            .then( result => {
                                res.status(200).json({
                                    message: 'User created'
                                })
                            })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ 
                                error: err
                            })
                        });
                    }
                })

            }
        });
};

exports.get_give_ansver = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then( user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth faild'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
                if (err) res.status(401).json({
                    message: "Auth failed"
                });
                if (result) {
                    const token = jwt.sign(
                        { 
                        email: user[0].email,
                        userId: user[0]._id
                        }, 
                        process.env.JWT_KEY,
                        {expiresIn: "1h"}
                    );
                    return res.status(200).json({
                        message: 'Auth successfull',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth faild',
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ 
                error: err
            })
        });
};
