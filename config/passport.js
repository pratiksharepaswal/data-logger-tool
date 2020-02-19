const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      // Match user
      try {
        let user = await User.findOneAndUpdate({ email }, {
          $push: { login_times: Date.now() }
        }, { new: true })
        if (!user) {
          return done(null, false, { message: 'This email is not registered' });
        }
        let correct = bcrypt.compareSync(password, user.password)
        if (correct) {
          return done(null, user)
        }
        return done(null, false)
      } catch (error) {
        console.log(error)
        return done(null, false, { message: "Incorrect password" })
      }
      // User.findOne({
      //   email: email
      // }).then(user => {
      //   if (!user) {
      //     return done(null, false, { message: 'That email is not registered' });
      //   }

      //   // Match password
      //   bcrypt.compare(password, user.password, (err, isMatch) => {
      //     if (err) throw err;
      //     if (isMatch) {
      //       return done(null, user);
      //     } else {
      //       return done(null, false, { message: 'Password incorrect' });
      //     }
      //   });
      // });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};