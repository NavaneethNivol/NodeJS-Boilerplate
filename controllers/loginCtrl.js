var crypto = require("crypto");
var jwt = require("jsonwebtoken");

var db = require("../models/db");
var config = require("../config/config");


module.exports.register = async function (req, res) {

    var create_object = {
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
    };

    for (var i in create_object) {
        if (!create_object[i]) {
            console.log("No " + i);
            res.status(500).json({
                success: false,
                message: i + "is a required field"
            });
            return;
        }
    }

    // First check for the email or the mobile number here.

    db.public.login.findAll({
            where: {
                [db.public.Op.or]: [{
                        email: create_object.email
                    },
                    {
                        mobile: create_object.mobile
                    }
                ]
            }
        })
        .then(existingUser => {
            console.log("The existing users are");
            // console.log(existingUser);
            if (existingUser.length > 0) {
                console.log("The email or mobile already exists");
                console.log(create_object);
                res.status(200).json({
                    success: false,
                    error: {
                        message: "The user with the email or mobile number already exists"
                    }
                });
                return;
            }
            ////////////////////
            var salt = crypto.randomBytes(16).toString('hex');
            var password = crypto.pbkdf2Sync(create_object.password, salt, 1000, 512, "sha512").toString('hex');

            create_object.password = password; // Hashed password.
            create_object.salt = salt;

            db.public.login.create(create_object)
                .then(login_data => {
                    var auth_data = {
                        role: login_data.role,
                        email: login_data.email,
                        id: login_data.id,
                        created_at: new Date()
                    };

                    var token = jwt.sign(auth_data, config.app.jwtKey);

                    res.status(200).json({
                        success: true,
                        token: token
                    });
                })
                .catch(function (err) {
                    console.log(err);
                    res.status(500).json({
                        success: false
                    });
                });
            //////////////////////////////
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false
            })
        })
};

module.exports.login = async function (req, res) {

    if (!req.body.email || !req.body.password) {
        console.log(req.body);
        res.status(500).json({
            success: false,
            message: "All fields are required"
        });
        return;
    }

    var email = req.body.email;

    let user = await db.public.login.findOne({
            where: {
                email: email
            }
        })
        // .then(user => {
    if (user) {
        console.log(user.id);
        password = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 512, "sha512").toString('hex');

        if (user.password === password) {
            // Get user profile
            
            var auth_data = {
                role: user.role,
                email: user.email,
                id: user.id,
                created_at: new Date()
            };
            
            var token = jwt.sign(auth_data, config.app.jwtKey);
            
            res.status(200).json({
                success: true,
                auth: auth_data,
                token: token,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Incorrect Password. Please try again."
            });
        }

    } else {
        res.status(500).json({
            success: false,
            error: {
                message: "We could not find your account."
            }
        });
    }

};