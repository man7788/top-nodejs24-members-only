const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('./db/queries');

const customFields = { usernameField: 'email' };

const verifyCallback = async (email, password, done) => {
  try {
    const result = await db.readUserByEmail(email);
    const user = result[0];

    if (!user) {
      return done(null, false, { message: 'Incorrect username' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

passport.use(new LocalStrategy(customFields, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.readUserById(id);
    const user = result[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
