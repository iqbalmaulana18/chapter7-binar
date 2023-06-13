const { Room } = require("../../database/models");

module.exports = {
    createRoom: async function(req, res) {
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
    }
}