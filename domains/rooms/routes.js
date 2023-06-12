const express = require('express');
const { Room } = require('../../database/models');

const roomRouter = express.Router();

roomRouter.post('/api/v1/rooms', async function(req, res) {
    const room = await Room.create({
       game_id: 1,
       created_by: 1,
    });

    res.json({
        message: 'success create new room',
        result: {
            room_id: room.id,
        },
        error: null,
    })
});

module.exports = roomRouter;