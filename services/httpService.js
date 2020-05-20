const axios = require("axios");
const cookieService = require("./cookieService");

const forumBEHost = process.env.BESERVICE || "http://localhost:8000";


const login = (req, res, data) => {
    axios({
        method: 'post',
        url: forumBEHost + '/auth/login',
        data: {
            username: data.username,
            password: data.password
        }
    })
        .then(function (response) {
            console.log("Login Successful");
            console.log(response.status);
            cookieService.setAuthCookie(req, res, response.headers.authorization);
            res.redirect("/");
        })
        .catch(function (error) {
            console.log(error.response.status);
            if(error.response.status === 403){
                res.render("index", {
                    user: {
                        isLoggedIn:false
                    },
                    error: "Invalid username/password!"
                })
            }
            res.render("index", {
                user: {
                    isLoggedIn:false
                },
                error: "something went wrong!"
            })

    })
};

const logout = (req, res) => {
    axios({
        method: 'post',
        url: forumBEHost + '/auth/logout',
        headers: {authorization: cookieService.getAuthCookie(req)},
        data: {}
    })
        .then(function (response) {
            console.log("Logout Successful");
            console.log(response.status);
            cookieService.removeAuthCookie(req, res);
            console.log("auth cookie is now: " + cookieService.getAuthCookie(req, res)); //TODO remove
            res.redirect("/");
        })
        .catch(function (error) {
            console.log(error)
        })
};

const createAccount = (req, res, data) => {
    axios({
        method: 'post',
        url: forumBEHost + '/auth/sign-up',
        data: {
            username: data.username,
            password: data.password
        }
    })
        .then(function (response) {
            console.log("Account Creation Successful");
            console.log(response.status);
            login(req, res, data)
            // res.redirect("/")
        })
        .catch(function (error) {
            console.log(error.response.status);
            if(error.response.status === 400){
                res.render("signup", {
                    error: "Username is taken!"
                })
            }
            res.render("signup", {
                error: "something went wrong!"
            })
        })
};

const saveTopic = (req, res, data) => {
    axios({
        method: 'post',
        url: forumBEHost + '/save-topic',
        headers: {authorization: cookieService.getAuthCookie(req)},
        data: {
            topicName: data.topicName
        }
    })
        .then(function (response) {
            console.log("Topic Creation Successful");
            let postData = {
                postText: data.postText,
                topicId: response.data.topic[0].topicId,
                topicName: response.data.topic[0].topicName
            };
            axios({
                method: 'post',
                url: forumBEHost + '/save-post',
                headers: {authorization: cookieService.getAuthCookie(req)},
                data: {
                    postText: postData.postText,
                    topicId: postData.topicId
                }
            })
                .then(function (response) {
                    console.log("Post for topic Creation Successful");
                    console.log(response.status);
                    res.redirect("/topic/" + data.topicId);
                })
                .catch(function (error) {
                    console.log(error.response.status);
                    res.render("createTopic", {
                        error: "something went wrong!",
                        topicNameInput: data.topicName,
                        topicPostText: data.postText
                    })
                })        })
        .catch(function (error) {
            console.log(error.response.status);
            res.render("createTopic", {
                error: "something went wrong!",
                topicNameInput: data.topicName,
                topicPostText: data.postText
            })
        })
};

const savePost = (req, res, data) => {
    axios({
        method: 'post',
        url: forumBEHost + '/save-post',
        headers: {authorization: cookieService.getAuthCookie(req)},
        data: {
            postText: data.postText,
            topicId: data.topicId
        }
    })
        .then(function (response) {
            console.log("Post Creation Successful");
            console.log(response.status);
            res.redirect("/topic/" + data.topicId);
        })
        .catch(function (error) {
            console.log(error.response.status);
            res.render("createTopic", {
                error: "something went wrong!",
                topicNameInput: data.topicName,
                topicPostText: data.postText
            })
        })
};

const getTopics = (req, res) => {
    const authToken = cookieService.getAuthCookie(req);
    return axios({
        method: 'GET',
        url: forumBEHost + '/retrieve-topics',
        headers: {authorization: authToken},
        data: {}
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error)
        })
};

const getNamesFromIds = (req, res, idArray) => {
    const authToken = cookieService.getAuthCookie(req);
    return axios({
        method: 'POST',
        url: forumBEHost + '/retrieve-users-from-ids',
        headers: {authorization: authToken},
        data: idArray
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error)
        })
};

const getPostsForTopic = (req, res, topidId) => {
    const authToken = cookieService.getAuthCookie(req);
    return axios({
        method: 'GET',
        url: forumBEHost + '/retrieve-posts/' + topidId,
        headers: {authorization: authToken},
        data: {}
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error)
        })
};

const getTopic = (req, res, topidId) => {
    const authToken = cookieService.getAuthCookie(req);
    return axios({
        method: 'GET',
        url: forumBEHost + '/retrieve-topic/' + topidId,
        headers: {authorization: authToken},
        data: {}
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error)
        })
};


module.exports = {
    login,
    logout,
    createAccount,
    getTopics,
    getNamesFromIds,
    getPostsForTopic,
    getTopic,
    saveTopic,
    savePost
};