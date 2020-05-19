const httpService = require('../services/httpService');

const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
    httpService.logout(req, res)
});

module.exports = router;