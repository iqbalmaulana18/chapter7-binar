const { Model, DataTypes } = require("sequelize");

function PlayerModel(sequelize) {
    class Player extends Model {}

    Player.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        room_id: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'rooms',
                },
                key: 'id'
            },
        },
        player_id: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'users',
                },
                key: 'id'
            },
        },
        data: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        tableName: 'players',
        timestamps: false,
    });

    return Player;
}

module.exports = PlayerModel;