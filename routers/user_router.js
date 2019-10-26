const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller')

var tokenAuth = (req, res, next) => { //a middleware used to verify the existence of a token
    const token = req.get('Authorization')
    if (token) {
        req.token = token
        next()
    } else {
        res.status(403).send({
            error: 'Please provide an Authorization header.'
        })
    }
}

router.get('/getUserInfo/:username', tokenAuth, (req, res) => {
    userController.getUserInfo(req.token, req.params.username)
        .then(
            (data) => {
                res.status(200).json({
                    message: 'Get successfully.',
                    data: data ? data : { //data null means the user does not exist
                        err: "User does not exist." 
                    }
                });
            },
            (error) => {
                res.status(500).send({
                    error: 'There was an error.',
                    error
                })
            }
        )
})

router.get('/isUserNameExists/:username', (req, res) => {
    userController.isUserNameExists(req.params.username)
        .then(
            (data) => {
                res.status(200).json({
                    message: 'Successfully judge whether the username exists.',
                    data: data
                });
            },
            (error) => {
                res.status(500).send({
                    error: 'There was an error.',
                })
            }
        )
})

router.post('/register', (req, res) => {
    userController.addUser(req.body)
        .then(
            (data) => {
                res.status(200).json({
                    message: 'Register successfully.',
                    data: data
                });
            },
            (error) => {
                res.status(500).send({
                    error: 'There was an error.',
                })
            }
        )
})

router.post('/login', (req, res) => {
    userController.login(req.body)
        .then(
            (data) => {
                res.status(200).json({
                    message: 'login successfully.',
                    data: data
                });
            },
            (error) => {
                res.status(500).send({
                    error: 'There was an error.',
                })
            }
        )
})

module.exports = router;