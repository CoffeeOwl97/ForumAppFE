const cookieService = require("../services/cookieService");
const httpService = require('../services/httpService');

const express = require('express');
const router = express.Router();

router.get("/topic/:topicId", (req, res) => {
    httpService.getTopic(req, res, req.params.topicId).then(topicResponse => {
        let topicName = topicResponse.data.topic[0].topicName;
        httpService.getPostsForTopic(req, res, req.params.topicId).then(response => {
            let posts = response.data.posts;
            let userIdArray = posts.map(post => post.userId);
            httpService.getNamesFromIds(req, res, userIdArray).then(namesResponse => {
                let userNamesArray = namesResponse.data.users.map(user => user.username);
                res.render("topic", {
                    posts,
                    usernames: userNamesArray,
                    topicName,
                    user: {
                        isLoggedIn: !(cookieService.getAuthCookie(req, res) === "null" || cookieService.getAuthCookie(req, res) === null)
                    },
                })
            })

        })
    })

});


module.exports = router;