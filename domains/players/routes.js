const express = require('express');
const authentication = require('../../middlewares/authentication');
const { createRoom } = require('./controller')
const playerRouter = express.Router();


// endpoint untuk create room
playerRouter.post('/api/v1/players/fight/:roomId', authentication, createRoom);

module.exports = playerRouter;