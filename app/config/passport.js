const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Load Models
const User = require('../models/user');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, async(username, password, done) => {
            try {
                const user = await User.findOne({ username: username });
                if (!user) return done(null, false, { message: 'Username doesn\'t exist.' });

                const match = await bcrypt.compare(password, user.password);
                
                if (match) return done(null, user);
                else {
                    return done(null, false, { message: 'Password incorrect.' })
                }
            } catch (error) {
                done(error);
            }
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}