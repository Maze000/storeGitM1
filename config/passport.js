const LocalStrategy = require('passport-local').Strategy;

const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../app/models/user');



const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const facebookClientID = process.env.FACEBOOK_CLIENT_ID;
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET;

module.exports = function (passport) {


  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });


  passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err, null));
});

  
  passport.use(new FacebookStrategy({
   clientID: facebookClientID,
   clientSecret: facebookClientSecret,
  callbackURL: "https://storegitm1-production.up.railway.app/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'emails']
 },
  function(accessToken, refreshToken, profile, done) {
     User.findOne({ 'facebook.id': profile.id }).then(user => {
      if (user) {
        return done(null, user);
      } else {
        var newUser = new User();
       newUser.facebook.id = profile.id;
       newUser.facebook.email = profile.emails ? profile.emails[0].value : undefined;
      newUser.facebook.name = profile.displayName;

       return newUser.save();
    }
   })
    .then(user => done(null, user))
   .catch(err => done(err));
  }
));


  passport.use(new GoogleStrategy({
    clientID: googleClientID,
   clientSecret: googleClientSecret,
   callbackURL: "https://storegitm1-production.up.railway.app/auth/google/callback"
  },
 function(accessToken, refreshToken, profile, done) {
     console.log('passportGoogle');
   User.findOne({ 'google.id': profile.id }).then(user => {
     if (user) {
       return done(null, user);
      } else {
       let newUser = new User();
        newUser.google.id = profile.id;
        newUser.google.email = profile.emails ? profile.emails[0].value : undefined;
       newUser.google.name = profile.displayName;

        return newUser.save();
      }
    })
    .then(user => done(null, user))
    .catch(err => done(err));
 }
));


  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({ 'local.email': email }).then(user => {
      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
      } else {
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        return newUser.save();
      }
    })
    .then(newUser => done(null, newUser))
    .catch(err => done(err));
  }
));

  

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({ 'local.email': email }).then(user => {
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }
      return done(null, user);
    }).catch(err => done(err));
  }
));

};
