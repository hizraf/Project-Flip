const auth = function (req, res, next) {
  // console.log(req.session);
  if (req.session.userId) {
    next();
  }
  else {
    res.redirect('/');
  }
};

module.exports = auth;