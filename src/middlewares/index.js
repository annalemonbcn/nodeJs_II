import passport from "passport";

const authenticateJwt = (req, res, next) => {
  passport.authenticate("current", { session: false }, async (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
    }

    req.user = user;

    next();
  })(req, res, next);
};

const authenticateWithCallback = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        return res.status(400).json({
          status: "error",
          message: info?.message || "Authentication failed",
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};

export { authenticateJwt, authenticateWithCallback };
