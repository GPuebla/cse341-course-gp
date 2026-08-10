const dotenv = require('dotenv');
dotenv.config();

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Upsert: first login creates the account, later logins just refresh the profile fields.
        const user = await User.findOneAndUpdate(
          { githubId: profile.id },
          {
            $set: {
              username: profile.username,
              displayName: profile.displayName || profile.username,
              email: profile.emails?.[0]?.value || null,
              avatarUrl: profile.photos?.[0]?.value || null,
            },
            $setOnInsert: {
              githubId: profile.id,
            },
          },
          { upsert: true, new: true }
        );

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Only the user's Mongo _id goes into the session cookie.
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

// On every request, the id from the cookie is turned back into a full user doc.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
