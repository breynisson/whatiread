'use strict';

var express = require('express');
var bookRouter = express.Router();

var router = function (nav) {

    var bookService = require('../Services/goodreadsService')();

    var bookController = require('../controllers/bookController')(bookService, nav);

    bookRouter.use(bookController.middleware);
    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/AddBook')
        .get(bookController.addBook);
    
    bookRouter.route('/:id')
        .get(bookController.getById);

    return bookRouter;
};

module.exports = router;