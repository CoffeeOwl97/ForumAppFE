const cookieService = require("../services/cookieService");
const httpService = require("../services/httpService");

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  if(cookieService.getAuthCookie(req, res) === "null" || cookieService.getAuthCookie(req, res) === null){
    httpService.getTopics(req, res).then(response => {
      let topics = response.data.topic;
      let userIdArray = topics.map(topic => topic.userId);

      httpService.getNamesFromIds(req, res, userIdArray).then(namesResponse => {
        let userNamesArray = namesResponse.data.users.map(user => user.username);
        res.render("index",{
          user: {
            isLoggedIn:false
          },
          topics: topics,
          usernames: userNamesArray
        })
      })
    }).catch(
        res.render("index",{
          user: {
            isLoggedIn:false
          },
          topics: {},
          usernames: {},
          error: "something went wrong!"
        }))
  } else {
    httpService.getTopics(req, res).then(response => {
      let topics = response.data.topic;
      let userIdArray = topics.map(topic => topic.userId);


      httpService.getNamesFromIds(req, res, userIdArray).then(namesResponse => {
        let userNamesArray = namesResponse.data.users.map(user => user.username);
        res.render("index",{
          user: {
            isLoggedIn:true
          },
          topics: topics,
          usernames: userNamesArray
        })
      })
    }).catch(
        res.render("index",{
          user: {
            isLoggedIn:false
          },
          topics: {},
          usernames: {},
          error: "something went wrong!"
        }))
  }
});

module.exports = router;
