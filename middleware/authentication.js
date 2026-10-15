const { validateToken } = require("../service/auth");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookeValue = req.cookies[cookieName]
        if(!tokenCookeValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookeValue);
            req.user = userPayload;
        }
        catch(error) {}
        
        return next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};