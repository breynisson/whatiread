'use strict';

var massive = require('massive');

var authorController = function (authorService, nav) {

    var middleware = function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    };

    var getIndex = function (req, res) {
        var url = 'postgres://localhost/postgres';
        massive.connect({connectionString:url},  function (err, db) {
            var collection = db.authors;
            collection.find({}, function (err, results) {
                res.render('authorListView', {
                    title: 'Authors',
                    nav: nav,
                    authors: results
                });
            });
        });
    };

    var getById = function (req, res) {
        var id = req.params.id;
        var url = 'postgres://localhost/postgres';
        massive.connect({connectionString:url},  function (err, db) {
            var collection = db.authors;
            collection.findOne({
                    goodreadsauthorid: id
                },
                function (err, results) {
                    if (results.goodreadsauthorid) {
                        authorService.getAuthorById(results.goodreadsauthorid,
                            function (err, author) {
                                results.author = author;
                                res.render('authorView', {
                                    title: 'Author',
                                    nav: nav,
                                    author: results
                                });
                            });
                    } else {
                        res.render('authorView', {
                            title: 'Author',
                            nav: nav,
                            author: results
                        });
                    }
                });
        });
    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = authorController;