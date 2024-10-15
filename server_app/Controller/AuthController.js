const User = require('../model/Auth')
const jwt = require('jsonwebtoken')

const register=(req,res) => {
    User.findOne({email:req.body.email})
    .then(user => {
        if(user){
            res.status(400).json({message:'Email already exists'});
        }else{
            const newUser = new User({
                name:req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            newUser.save()
            res.status(200).json({message:'User create'});
        }
    })
    .catch(err => {
        res.status(500).json({
            message:'Error'
        });
    })
}

const login = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            if (user.password === req.body.password) {
                let token = jwt.sign({ id: user.id }, 'secret', {
                    expiresIn: '1h'
                });
                res.status(200).json({
                    access_token: token,
                    user: user 
                });
            } else {
                res.status(400).json({ message: 'Incorrect Password' });
            }
        } else {
            res.status(400).json({ message: 'Incorrect email' });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error'
        });
    });
}

module.exports = {
    register,
    login
}