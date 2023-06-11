const { Model, DataTypes } = require("sequelize");

function RoomModel(sequelize) {
    class Room extends Model {}

    Room.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        game_id: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'games',
                },
                key: 'id'
            },
        },
        created_by: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'users',
                },
                key: 'id'
            },
        },
    }, {
        sequelize,
        tableName: 'rooms',
        timestamps: false,
    });

    return Room;
}

module.exports = RoomModel;