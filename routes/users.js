const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const Log = require('../models/Log');
const {
  forwardAuthenticated
} = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const {
    name,
    email,
    password,
    password2
  } = req.body;
  console.log(name, email, password, password2)
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({
      msg: 'Please enter all fields'
    });
  }

  if (password != password2) {
    errors.push({
      msg: 'Passwords do not match'
    });
  }

  if (password.length < 6) {
    errors.push({
      msg: 'Password must be at least 6 characters'
    });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({
      email: email
    }).then(user => {
      if (user) {
        errors.push({
          msg: 'Email already exists'
        });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          register_time: Date.now()
        })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save((err, saved) => {
                if (err) {
                  console.log(err)
                }
                new Log({
                  log_type: "auth",
                  message: "User registered.",
                  user: saved._id
                }).save()
                return res.redirect("/dashboard")
              })
          });
        });
      }
    });
  }
});




// Login clickstream
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login',
  failureFlash: true
}), async (req, res) => {
  let user_id = req.user ? req.user._id : null
  try {
    await new Log({
      log_type: "auth",
      message: "User logged in",
      user: user_id
    }).save()
  } catch (error) {
    console.log(error)
  }
  res.redirect("/dashboard")
});

// Logout clickstream
router.get('/logout', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    let u = await User.findOneAndUpdate({
      _id: user_id
    }, {
      $push: {
        logout_times: Date.now()
      }
    }, {
      new: true
    })
    let log = await new Log({
      log_type: "auth",
      message: "User logged out",
      user: user_id
    }).save()
    if (u && log) {
      console.log(u);
      req.logout();
      req.flash('success_msg', 'You are logged out');
      res.redirect('/users/login');
    }
  }
});

module.exports = router;