const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path')
const session = require('express-session');
const {db} = require('./database')

mongoose.Promise = global.Promise;
const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
// const db = require('./config/keys').MongoURI

// Connect to MongoDB
// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));
  
db.connect(false).then( conn => {
  
})

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'))
app.use(express.static(path.join(__dirname, "public")))

// Express body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/videos', require('./routes/video'))

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


app.listen(8000, "0.0.0.0");
console.log('Server is running');
