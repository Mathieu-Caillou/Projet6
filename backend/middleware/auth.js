const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.autorization.split(" ")[1];
        const decondedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decondedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valable !";
        } else {
            next();
        }
    } catch (error){
        res.status(401).json({ error: new Error("Requête non authentifiée ! ")});
    }
};