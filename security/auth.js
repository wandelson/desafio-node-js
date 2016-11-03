var jwt = require('jsonwebtoken');

var moment = require('moment');

var config = require('config');


exports.signIn = function (user) {
    return jwt.sign({
        email: user.email,
        ultimo_login: user.ultimo_login
    }, config.SALT_KEY, {
            //  expiresIn: 1440 //expira em 24 horas
        }
    );
};


exports.authorize = function (req, res, next) {

    var bearer = req.headers.authorization;

    if (bearer) {
        var token = bearer.replace('Bearer', '').trim();
    }
    //var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.autorization.replace('Bearer','').trim();

    if (!token) {
        res.status(401).json({
            message: 'Não autorizado.'
        });
    }
    else {
        jwt.verify(token, config.SALT_KEY, function (error, decoded) {

            if (error) {
                res.status(401).json({
                    message: "Não autorizado"
                });
            }
            else {
                var diff = moment().diff(moment(decoded.ultimo_login), 'minutes');

                if (diff > 30) {
                    res.status(401).json({
                        message: "Sessão inválida"
                    });
                }
                else {
                    next();
                }

            }

        });
    }

};

