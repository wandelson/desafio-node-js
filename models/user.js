var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    "data_criacao": {
        type: Date,
        required: true
    },
    "data_atualizacao": {
        type: Date
    },
    "ultimo_login": {
        type: Date
    },
    "nome": {
        type: String,
        required: true,
        trim: true,
    },
    "token": {
        type: String,
        required: true,
    },
    "senha": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "telefones": [
        {
            ddd: {
                type: String,
                required: true,
            },
            numero: {
                type: String,
                required: true,
            }
        }]
});

var user = mongoose.model('user', userSchema);

module.exports = {
    User: user
};