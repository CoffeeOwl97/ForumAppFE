
const setAuthCookie = (req, res, token) => {
    return req.session.authCookie = token;
};

const getAuthCookie = (req, res) => {
    return req.session.authCookie ? req.session.authCookie : "null";
};

const removeAuthCookie = (req, res) => {
    return req.session.authCookie = "null";
};

module.exports = {
    setAuthCookie,
    getAuthCookie,
    removeAuthCookie,
};