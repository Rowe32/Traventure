const requireLogin = (req, res, next) => {
    if (!req.session.currentUser) {
        res.send("No session exists for this user");
        return;
    }
    next();
};

module.exports = requireLogin;