module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_game_histories', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'users',
            },
            key: 'id'
          }, 
      },
      game_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'games',
            },
            key: 'id'
          }, 
      },
      score: {
          type: Sequelize.DataTypes.INTEGER,
      },
      played_at: {
          type: Sequelize.DataTypes.DATE,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_game_histories');
  }
};
