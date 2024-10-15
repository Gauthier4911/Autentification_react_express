const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, 'secret', (err, user) => {
        if (err) {
            return res.redirect('/login');
        }
        req.user = user; 
        next(); 
    });
};

module.exports = authenticateToken;