const express = require('express');
const authentication = require('../../middlewares/authentication');
const { Player, Room, Game, User } = require('../../database/models');

const playerRouter = express.Router();

const RPS = 1;

function rpsGetWinner(players) {
    let winner = null;
    let draw = false;

    const [pl1, pl2] = players;
    
    if (pl1.data === pl2.data) {
        draw = true;
    } else if (pl1.data === 'R') {
        (pl2.data === 'P')
            ? winner = pl2.player_id 
            : winner = pl1.player_id;
    } else if (pl1.data === 'P') {
        (pl2.data === 'S')
            ? winner = pl2.player_id
            : winner = pl1.player_id
    } else if (pl1.data === 'S') {
        (pl2.data === 'R')
            ? winner = pl2.player_id
            : winner = pl1.player_id
    }

    return { winner, draw };
}

async function rpsHandle(players, game, userId) {
    const { winner, draw } = rpsGetWinner(players);

        const userWinner = await User.findOne({
            attributes: ['id', 'username'],
            where: {
                id: winner,
            },
        });

        return {
            message: 'game ended',
            result: {
                winner: userWinner,
                draw: draw,
                status: winner === req.user.id ? 'congrats, you are the winner' : 'sorry, you are lost',
                score: game.score,
            },
            error: 'room not found',
        };
}

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

    const game = await Game.findOne({
        where: {
            id: room.game_id,
        },
    });

    const players = await Player.findAll({
        where: {
            room_id: Number(roomId)
        },
    });

    if (game.id === RPS && players.length === game.max_player) {
        const result = await rpsHandle(players, game, req.user.id);
        res.json(result);

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