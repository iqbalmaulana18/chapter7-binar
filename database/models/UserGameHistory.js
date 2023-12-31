const { Model, DataTypes } = require("sequelize");
const UserBioModel = require("./UserBio");

function UserGameHistoryModel (sequelize) {
    class UserGameHistory extends Model {}

    UserGameHistory.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'users',
                },
                key: 'id'
            }, 
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
        score: {
            type: DataTypes.INTEGER,
        },
        played_at: {
            type: DataTypes.DATE,
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
    }, {
        sequelize,
        tableName: 'user_game_histories',
        timestamps: false,
    });

    return UserGameHistory;

}

module.exports = UserGameHistoryModel;




