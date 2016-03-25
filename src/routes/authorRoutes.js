'use strict';

var express = require('express');
var authorRouter = express.Router();
var massive = require('massive');
var passport = require('passport');

var router = function (nav) {

    var authorService = require('../services/goodreadsService')();

    var authorController = require('../controllers/authorController')(authorService, nav);

    authorRouter.use(authorController.middleware);
    authorRouter.route('/')
        .get(authorController.getIndex);

    authorRouter.route('/:id')
        .get(authorController.getById);

    return authorRouter;
};

module.exports = router;