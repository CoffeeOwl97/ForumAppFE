const httpService = require('../../services/httpService');

const express = require('express');
const router = express.Router();

router.post('/login-form', (req, res) => {

    httpService.login(req, res, {
        username: req.body.Username,
        password: req.body.Password,
        returnURL: req.headers.referer
    })
});

module.exports = router;