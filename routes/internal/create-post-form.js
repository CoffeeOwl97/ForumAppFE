const httpService = require('../../services/httpService');

const express = require('express');
const router = express.Router();

router.post('/create-post-form/:topicId', (req, res) => {
    if(req.body.postText !== ''){
        httpService.savePost(req, res, {
            postText: req.body.postText,
            topicId: req.params.topicId,
        })
        } else {
            res.render("topic/" + req.params.topicId, {
                error: "Post text cannot be empty!",
            })
        }

});

module.exports = router;