module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rooms', {
      id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
      created_by: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'users',
            },
            key: 'id'
          },
      },
    }, {
      timestamps: false,
    });
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('rooms');
  },
};