const { Model, DataTypes } = require("sequelize");

function GameModel(sequelize){
    class Game extends Model {}

    Game.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING
        },
        score: {
            type: DataTypes.INTEGER
        },
        max_player: {
            type: DataTypes.INTEGER
        },
    }, {
        sequelize,
        tableName: 'games',
        timestamps: false,
    });

    return Game;
}

module.exports = GameModel;

