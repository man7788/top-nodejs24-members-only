exports.Authenticator = class authClass {
  failRedirect(url) {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.redirect(url);
      }
      next();
    };
  }

  failStatus(code, message) {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.status(code).send(message);
      }
      next();
    };
  }

  redirect(url) {
    return (req, res, next) => {
      if (req.isAuthenticated()) {
        return res.redirect(url);
      }
      res.status(401).send('401 Unauthorized');
    };
  }
};
