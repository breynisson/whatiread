'use strict';

var massive = require('massive');

var bookController = function (bookService, nav) {

    var middleware = function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    };
    
    var addBook = function (req, res) {
        res.render('addBookView', {
            title: 'AddBook',
            nav: nav,
        });
        
    };

    var getIndex = function (req, res) {
        var url = 'postgres://localhost/postgres';
        massive.connect({connectionString:url},  function (err, db) {
            db.allBooksWithAuthors({}, function (err, results) {
                console.log(results);
                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
                    books: results
                });
            });
        });
    };

    var getById = function (req, res) {
        var id = req.params.id;
        var url = 'postgres://localhost/postgres';
        massive.connect({connectionString:url},  function (err, db) {
            var collection = db.books;
            collection.findOne({
                goodreadsid: id
            },
            function (err, results) {
                if (results.goodreadsid) {
                    bookService.getBookById(results.goodreadsid,
                        function (err, book) {
                            results.book = book;
                            res.render('bookView', {
                                title: 'Book',
                                nav: nav,
                                book: results
                            });
                        });
                } else {
                    res.render('bookView', {
                        title: 'Book',
                        nav: nav,
                        book: results
                    });
                }
            });
        });
    };

    return {
        getIndex: getIndex,
        getById: getById,
        addBook: addBook,
        middleware: middleware
    };
};

module.exports = bookController;