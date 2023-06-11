module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('players', {
      id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      room_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'rooms',
            },
            key: 'id'
          },
      },
      player_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'users',
            },
            key: 'id'
          },
      },
      data: {
          type: Sequelize.DataTypes.STRING
      },
    }, {
        timestamps: false,
    });
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('players');
  },
};