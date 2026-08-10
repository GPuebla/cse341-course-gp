// GET /auth/github/callback (runs after passport.authenticate('github') succeeds)
const githubCallback = (req, res) => {
  res.redirect('/auth/user');
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

// GET /auth/user (protected by ensureAuth, which returns 401 when not logged in)
const getCurrentUser = (req, res) => {
  const { _id, githubId, username, displayName, email, avatarUrl, createdAt } = req.user;

  res.status(200).json({ _id, githubId, username, displayName, email, avatarUrl, createdAt });
};

module.exports = {
  githubCallback,
  failure,
  logout,
  getCurrentUser,
};
