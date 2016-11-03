var User = require('../models/user').User;

var md5 = require('MD5');

var config = require('../config/config.js');

var auth = require('../security/auth');


exports.singup = function (req, res) {

    User.findOne({ email: req.body.email }, function (error, exists) {
        if (error) {
            res.status(500).json(error);
            return;
        }
        else {
            if (exists != null) {
                res.status(500).json(
                    {
                        mensagem: "E-mail já existente"
                    }
                );
                return;
            }
        }


        var user = new User();
        user.nome = req.body.nome;
        user.email = req.body.email;
        user.senha = md5(req.body.senha + global.SaltKey);
        user.telefones = req.telefones;
        user.data_criacao = new Date().toJSON();
        user.data_atualizacao = new Date().toJSON();
        user.ultimo_login = user.data_criacao;
        user.telefones = req.body.telefones;
        user.token = auth.signIn(user);

        user.save(function (error) {
            if (error) {
                res.status(500).json(error);
                return;
            }

            res.status(201).json({
                id: user._id,
                nome: user.nome,
                email: user.email,
                data_criacao: user.data_criacao,
                data_atualizacao: user.data_atualizacao,
                ultimo_login: user.ultimo_login,
                token: user.token,
                senha: user.senha,
                telefones: user.telefones
            });
        });

    });
};


exports.ping = function (req, resp) {

    resp.status(200).json({

        message: "PING"
    });

};


exports.signin = function (req, resp) {

    User.findOne({
        email: req.body.email,
        senha: md5(req.body.senha + global.SaltKey)
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

          
            user.ultimo_login =  new Date().toJSON();

            user.save();

            var token = auth.signIn(user);

            resp.status(200).json({
                user: {
                    id: user._id,
                    nome: user.nome,
                    email: user.email,
                    data_criacao: user.data_criacao,
                    data_atualizacao: user.data_atualizacao,
                    ultimo_login: user.ultimo_login,
                    token: user.token,
                    senha: user.senha
                }
            });


        });

};





exports.getById = function (req, res) {

    var id = req.params.id;

    User.find({ _id: id }, function (error, result) {
        if (error) {
            res.status(500).json(error);
            return;
        }
        res.status(200).json(result);
    });

};