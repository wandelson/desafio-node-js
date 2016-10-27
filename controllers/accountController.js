var md5 = require('md5');

var User = require('../models/user').User;

var auth = require('../security/auth');

exports.authenticate = function (req, resp) {

    User.findOne({
        username: req.body.username,
        password: md5(req.body.password + global.SALT_KEY)
    },
        function (error, user) {
            if (error) {
                resp.status(500).json(error);
                return;
            }

            if (!user) {
                resp.status(401).json({
                    message: "Usuário ou senha inválidos!"
                });

                return;
            }

            var token = auth.signIn(user);

            resp.status(200).json({
                token: token,
                user: {
                    id: user._id,
                    username: user.username,
                    admin: user.admin
                }
            });


        });

};



