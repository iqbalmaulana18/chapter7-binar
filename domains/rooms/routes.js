const express = require('express');
const { Room } = require('../../database/models');
const authentication = require('../../middlewares/authentication');
const { createRoom } = require('../players/controller');

const roomRouter = express.Router();

// endpoint untuk create room
roomRouter.post('/api/v1/rooms', authentication, createRoom);

module.exports = roomRouter;