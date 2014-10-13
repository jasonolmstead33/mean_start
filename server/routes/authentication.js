var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

// simple local strategy with hard-coded user
var Users = require('../local_modules/users');

module.exports = {
  localStrategy: new localStrategy(
    function(username, password, done) {
        Users.findUserByUsername(username)
        .then(function(user)
        {
          if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            } else if (user.password != password) {
                return done(null, false, { message: 'Incorrect password.' });
            } else {
                return done(null, user);
            }
        });
    }
  ),

  serializeUser: function(user, done) {
    done(null, user.id);
  },

  deserializeUser: function(id, done) {
    Users.findUserById(id)
    .then(function(user)
    {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  },

  login: function(req, res, next) {
    console.log("Logging in");
    return passport.authenticate('local', function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send(400, {message: 'Bad username or password'});
      }

      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }

        res.json(200, user);
      });
    })(req, res, next);
  },

  logout: function(req, res) {
    req.logout();
    return res.send(200);
  },

  // NOTE: Need to protect all API calls (other than login/logout) with this check
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.send(401);
    }
  },

  ensureAdmin: function(req, res, next) {
      // ensure authenticated user exists with admin role, otherwise send 401 response status
      if (req.user && req.user.role.toLowerCase() == 'admin') {
          return next();
      } else {
          return res.send(401);
      }
  }



};