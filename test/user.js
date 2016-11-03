process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
var User = require('../models/user').User;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Remover ', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
            done();
        });
    });

    describe('/POST singup', () => {
        it('singup', (done) => {
            var user = {
                nome: "teste",
                email: "teste22@gmail.com",
                senha: "teste"
            }
            chai.request(server)
                .post('/api/singup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('email');
                    res.body.should.have.property('nome');
                    res.body.should.have.property('senha');
                    done();
                });
        });

    });


});

