'use strict';

var express = require('express');
var bookRouter = express.Router();

var router = function (nav) {
    var books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: {
                name: 'Lev Nikolayevich Tolstoy',
                sex: 'Male',
                nationality: 'Russian'
            },
            read: false,
            language: 'en'
        },
        {
            title: 'Les Misérables',
            genre: 'Historical Fiction',
            author: {
                name: 'Victor Hugo',
                sex: 'Male',
                nationality: 'French'
            },
            read: false,
            language: 'en',

        },
        {
            title: 'A Journey into the Center of the Earth',
            genre: 'Science Fiction',
            author: {
                name: 'Jules Verne',
                sex: 'Male',
                nationality: 'French'
            },
            read: false,
            language: 'en',

        },
        {
            title: 'The Dark World',
            genre: 'Fantasy',
            author: {
                name: 'Henry Kuttner',
                sex: 'Male',
                nationality: 'American'
            },
            read: false,
            language: 'en',

        },
        {
            title: 'Íslandsklukkan',
            genre: 'Historical Fiction',
            author: {
                name: 'Halldór Kiljan Laxness',
                sex: 'Male',
                nationality: 'Icelandic'
            },
            read: false,
            language: 'is',

        }

    ];

    bookRouter.route('/')
        .get(function (req, res) {
            res.render('bookListView', {
                title: 'Books',
                nav: nav,
                books: books
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'Book',
                nav: nav,
                books: books[id]
            });
        });

    return bookRouter;
};

module.exports = router;