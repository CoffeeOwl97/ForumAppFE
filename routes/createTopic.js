const express = require('express');
const router = express.Router();

router.get("/create-topic", (req, res) => {
    res.render("createTopic",{
        error: null,
        topicNameInput: "",
        topicPostText: ""
    })
});

module.exports = router;