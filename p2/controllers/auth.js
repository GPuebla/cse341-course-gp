// GET /auth/github/callback (runs after passport.authenticate('github') succeeds)
const githubCallback = (req, res) => {
  res.redirect('/auth/profile');
};

// GET /auth/failure
const failure = (req, res) => {
  res.status(401).json({ success: false, message: 'GitHub authentication failed.' });
};

// GET /auth/logout
const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.status(200).json({ success: true, message: 'Logged out successfully.' });
    });
  });
};

// GET /auth/profile
const profile = (req, res) => {
  const { _id, githubId, username, displayName, email, avatarUrl, createdAt } = req.user;

  res.status(200).json({ _id, githubId, username, displayName, email, avatarUrl, createdAt });
};

module.exports = {
  githubCallback,
  failure,
  logout,
  profile,
};
