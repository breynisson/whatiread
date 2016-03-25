'use strict';

var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});

var goodreadsService = function () {

    var getBookById = function (id, cb) {

        var goodReadsKey = require('../../config')();

        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/' + id + '?format=xml&key=' + goodReadsKey
        };

        var callback = function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                parser.parseString(str, function (err, result) {
                    cb(null, result.GoodreadsResponse.book);
                });
            });
        };

        http.request(options, callback).end();
    };

    var getAuthorById = function (id, cb) {

        var goodReadsKey = require('../../config')();

        var options = {
            host: 'www.goodreads.com',
            path: '/author/show/' + id + '?format=xml&key=' + goodReadsKey
        };

        var callback = function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                parser.parseString(str, function (err, result) {
                    cb(null, result.GoodreadsResponse.author);
                });
            });
        };

        http.request(options, callback).end();
    };

    return {
        getBookById: getBookById,
        getAuthorById: getAuthorById
    };
};

module.exports = goodreadsService;