const httpService = require('../../services/httpService');

const express = require('express');
const router = express.Router();

router.post('/create-topic-form', (req, res) => {
    if(req.body.TopicName !== '' && req.body.TopicPostText !== ''){
        if(req.body.TopicName !== ''){
            if(req.body.TopicPostText !== ''){
                httpService.saveTopic(req, res, {
                    topicName: req.body.TopicName,
                    postText: req.body.TopicPostText,
                })
            } else {
                res.render("createTopic", {
                    error: "Post text cannot be empty!",
                    topicNameInput: req.body.TopicName,
                    topicPostText: ""
                })
            }
        } else {
            res.render("createTopic", {
                error: "Topic name cannot be empty!",
                topicNameInput: "",
                topicPostText: req.body.TopicPostText
            })
        }
    } else {
        res.render("createTopic", {
            error: "Both topic name field and post text field are empty!",
            topicNameInput: "",
            topicPostText: ""
        })
    }

});

module.exports = router;