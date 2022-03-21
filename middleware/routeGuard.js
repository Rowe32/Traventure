const requireLogin = (req, res, next) => {
    console.log(req.session.currentUser)
    if (!req.session.currentUser) {
        res.send("No session exists for this user");
        return;
    }
    next();
};

module.exports = requireLogin;