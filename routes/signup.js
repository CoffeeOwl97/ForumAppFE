const express = require('express');
const router = express.Router();

router.get("/sign-up", (req, res) => {
    res.render("signup",{
        error: null
    })
});

module.exports = router;