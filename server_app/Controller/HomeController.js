const home = (req, res) => {
    res.status(200).json({
        message: "Welcome to Home Page",
        user: req.user
    });
};

module.exports = {
    home
};