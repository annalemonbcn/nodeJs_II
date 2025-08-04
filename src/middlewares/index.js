import passport from "passport";

const basePassportAuth = (strategy, onFailure) => {
  return (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      if (err || !user) return onFailure(req, res, info);
      req.user = user;
      next();
    })(req, res, next);
  };
};

const authenticateJwt = basePassportAuth("current", (req, res) =>
  res.status(401).json({ status: "error", code: 401, message: "Unauthorized" })
);

const authenticateWithCallback = (strategy) =>
  basePassportAuth(strategy, (req, res, info) =>
    res.status(400).json({
      status: "error",
      message: info?.message || "Authentication failed",
    })
  );

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        status: "error",
        code: 403,
        message: "Forbidden: Insufficient permissions",
      });
    }

    next();
  };
};

export { authenticateJwt, authenticateWithCallback, authorizeRoles };
