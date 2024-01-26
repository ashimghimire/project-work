const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user'); // Adjust

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'simba-1'; 

async function findUserByUsername(username) {
    try {
      const user = await User.findOne({ username: username });
      return user;
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }

  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await findUserByUsername(username);
      console.log(user);
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      return done(null, user);
    } catch (error) {
      console.error('Error finding user:', error);
      return done(error);
    }
  }));

  passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user)); 
  });

  passport.deserializeUser(function(id, done) {
    done(err, JSON.parse(user));
  });
  

passport.use(   
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.sub, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);


module.exports=passport;
