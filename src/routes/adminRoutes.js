'use strict';

var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

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

var router = function (nav) {

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });

    return adminRouter;

};

module.exports = router;