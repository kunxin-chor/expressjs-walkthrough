const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


// store a logged inuser by its id
passport.serializeUser((user, done) => {
    // done is given to us by passport. The first arugment is error, the second argument is how we want to 'remember' the user
    // in this case, we are saying to remember a user by its id.
    done(null, user._id);
});

// Given a user id, retrieve the user
passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findUserById(id);
    done(null, user);
});

passport.use(new LocalStrategy(
    {usernameField:"email"},  // tell passport that we are logging in via email. Can also set what's the name of the password field (default 'password')
    async (email, password, done) => { // callback function that triggers when a user logs in

        // attempt to find the user
        let user = await UserModel.findByEmail(email);
        // compare the plain password with the encrypted password.
        if (user && bcrypt.compareSync(password, user.password)) {
            done(null, user);
        } else {
             done(null, false, {
                message:"Invalid login"
            })
        }
    }

))

module.exports = passport;