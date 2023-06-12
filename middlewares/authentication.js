const jwt = require('jsonwebtoken');
const { User } = require("../database/models");

const authentication = async function(req, res, next) {
    const token = req.header('Authorization');

    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        res.status(400);
        res.json({
            message: 'failed',
            result: null,
            error: 'token invalid'
        });

        return;
    }

    req.user = await User.findOne({
        where: {
            id: decoded.sub,
        },
    });

    next();
}

module.exports = authentication;