const express = require('express');
const authentication = require('../../middlewares/authentication');
const { Player, Room } = require('../../database/models');

const playerRouter = express.Router();

// endpoint untuk create room
playerRouter.post('/api/v1/players/fight/:roomId', authentication, async function(req, res) {
    const roomId = req.params.roomId;
    const data = req.body.data;

    const room = await Room.findOne({
        where: {
            id: roomId,
        },
    });

    if (!room) {
        res.json({
            message: 'failed',
            result: null,
            error: 'room not found',
        });

        return;
    }

    const isExist = await Player.findOne({
        where: {
            room_id: Number(roomId),
            player_id: req.user.id,
        },
    });

    if (isExist) {
        res.json({
            message: 'failed',
            result: null,
            error: 'you already played in this room',
        });

        return;
    }

    const player = await Player.create({
        room_id: Number(roomId),
        player_id: req.user.id,
        data: data
    });

    res.json({
        message: 'success fight',
        result: player,
        error: null,
    });
});

module.exports = playerRouter;