const axios = require("axios");
const cookieService = require("./cookieService");

const forumBEHost = "http://forumbe-env-1.eba-dzauvukx.us-east-1.elasticbeanstalk.com/";


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
    getTopic
};