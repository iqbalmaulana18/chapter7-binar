module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.addColumn('user_game_histories', 'room_id', {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'rooms',
          },
          key: 'id'
        },
    });
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn('user_game_histories', 'room_id');
  }
};