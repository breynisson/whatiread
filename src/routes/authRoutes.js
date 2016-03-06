'use strict';

var express = require('express');
var authRouter = express.Router();
var massive = require('massive');
var passport = require('passport');

var router = function () {
    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            var url = 'postgres://localhost/postgres';
            massive.connect({connectionString:url}, function (err, db) {
                var collection = db.users;
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };
                collection.insert(user, function (err, results) {
                    console.log(results);
                    req.login(results, function () {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });

    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .all(function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function (req,res) {
            console.log(req.user);
            res.json(req.user);
        });
    return authRouter;
};

module.exports = router;