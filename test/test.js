'use strict';

var request = require('supertest');
var app = require('../app.js').getApp;

describe('GET', function () {
    it('expects HTTP response 200', function (done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
});