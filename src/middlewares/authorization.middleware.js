import passport from "passport";

export function authenticate(strategy) {
    return (req, res, next) => {
        passport.authenticate(strategy, { session: false }, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.user = user;
            next();
        })(req, res, next);
    };
}


export function authorizations(roles) {
    return (req, res, next) => {
        passport.authenticate("jwt", { session: false }, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            if (!roles.includes(user.role)) { 
                return res.status(403).json({ message: "Unauthorized" });
            }
            req.user = user;
            next();
        })(req, res, next);
    };
}