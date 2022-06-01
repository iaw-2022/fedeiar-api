const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: 'https://speedrunVideos/api',
    issuerBaseURL: `https://dev-w1hro3h2.us.auth0.com/`,
});

module.exports = {
    checkJwt
}