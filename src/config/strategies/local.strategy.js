'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var massive = require('massive');

module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    function (username, password, done) {
        var url = 'postgres://localhost/postgres';
        massive.connect({connectionString: url}, function (err, db) {
            db.users.findOne({
                username: username
            },
            function (err, results) {
                if (results !== null) {
                    if (results.password === password) {
                        done(null, results);
                    } else {
                        done(null, false, {message:'Wrong Username or Password'});
                    }
                } else {
                    done(null, false, {message:'Wrong Username or Password'});
                }
            }
            );
        });
    }));
};