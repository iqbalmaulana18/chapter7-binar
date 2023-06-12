const express = require('express');
const { Room } = require('../../database/models');
const authentication = require('../../middlewares/authentication');

const roomRouter = express.Router();

// endpoint for create new room
roomRouter.post('/api/v1/rooms', authentication, async function(req, res) {
    const ROCK_PAPER_SCISSOR = 1;

    const room = await Room.create({
       game_id: ROCK_PAPER_SCISSOR,
       created_by: req.user.id,
    });

    res.json({
        message: 'success create new room',
        result: {
            room_id: room.id,
        },
        error: null,
    });
});

module.exports = roomRouter;