const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../database/models");

// strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async function (username, password, done) {
      const user = await User.findOne({
        where: {
          username: username,
          role: "ADMIN",
        },
      });

      if (!user) {
        return done("invalid", null);
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return done("invalid", null);
      }

      return done(null, user);
    }
  )
);

// serialize
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

// deserialized
passport.deserializeUser(async function (userId, done) {
  return done(
    null,
    await User.findOne({
      where: {
        id: userId,
      },
    })
  );
});

module.exports = passport;