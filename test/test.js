'use strict';

var mocha = require('mocha');
var request = require('supertest');
var app = require('../app.js').getApp;

mocha.describe('GET', function () {
    mocha.it('expects HTTP response 200', function (done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
});