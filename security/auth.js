var jwt = require('jsonwebtoken');

var moment = require('moment');

exports.signIn = function (user) {
    return jwt.sign({
        email: user.email,
        nome: user.nome
    }, global.SALT_KEY, {
            expiresIn: 1440 //expira em 24 horas
        }
    );
};


exports.authorize = function (req, res, next) {

   var bearer = req.headers.authorization;

   if(bearer){
    var token = bearer.replace('Bearer','').trim();
   }
    //var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.autorization.replace('Bearer','').trim();

    if (!token) {
        res.status(401).json({
            message: 'Não autorizado.'
        });
    }
    else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {

            if (error) {
                res.status(401).json({
                    message: "Não autorizado"
                });
            }
            else {

             var ultimo_login =  decoded.nome;

             var diff = moment().diff(moment(ultimo_login), 'minutes');

             next();
            }

        });
    }

};

