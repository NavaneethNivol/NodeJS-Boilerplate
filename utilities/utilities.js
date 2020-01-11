var jwt = require("jsonwebtoken");
var config = require("../config/config");
var request = require("request");

module.exports.decryptJWTWithToken = function (token) {
    if (!token) {
        return false;
    }

    // token = token.split("Bearer ")[0]; // If Bearer system is implimented

    var user_credentials = jwt.verify(token, config.app.jwtKey);
    return user_credentials;
}

module.exports.sendEmail = function (to, subject, message, callback) {
    // console.log("The send grid api key is: ");
    // console.log(config.apiKeys.sendGrid);

    console.log("Sending an email to ");
    console.log(to);
    var options = {
        method: 'POST',
        url: 'https://api.sendgrid.com/v3/mail/send',
        headers: {
            authorization: 'Bearer ' + config.apiKeys.sendGrid,
            'content-type': 'application/json'
        },
        body: {
            personalizations: [{
                to: [{
                    email: to.email,
                    name: to.name
                }],
                subject: subject
            }],
            from: {
                email: "rgautam9398@gmail.com",
                name: 'Raghavendra Gautam'
            },
            reply_to: {
                email: 'rgautam9398@gmail.com',
                name: 'Raghavendra Gautam'
            },
            subject: subject,
            content: [{
                type: 'text/html',
                value: message
            }]
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
            if (callback) {
                callback(false);
            }
            return;
        }
        console.log("Sending email is a success");
        console.log(body);

        if (callback) {
            callback(true);
        }

    });
};


/*
    To use:

//    var config = require("../config/config");
    var utilities = require("../utilities/utilities");

    // Implement the callback version as well.

    var user_credentials = utilities.decryptJWTWithToken(req.get("X-AUTH-TOKEN"));

    if(!user_credentials){
        res.status(401).json({
            success: false,
            error: {
                message: "Unauthorized for transaction"
            }
        });
        return;
    }
*/
