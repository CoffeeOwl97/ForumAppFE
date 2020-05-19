const httpService = require('../../services/httpService');

const express = require('express');
const router = express.Router();

router.post('/create-account-form', (req, res) => {
    if(req.body.Username !== '' && req.body.Password !== ''){
        if(req.body.Username !== ''){
            if(req.body.Password !== ''){
                httpService.createAccount(req, res, {
                    username: req.body.Username,
                    password: req.body.Password,
                })
            } else {
                res.render("signup", {
                    error: "Password field cannot be empty!"
                })
            }
        } else {
            res.render("signup", {
                error: "Username field cannot be empty!"
            })
        }
    } else {
        res.render("signup", {
            error: "Both Username field and Password field are empty!"
        })
    }

});

module.exports = router;