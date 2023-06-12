module.exports = {
  async up(queryInterface, { DataTypes }) {
      await queryInterface.addColumn('games', 'max_player', {
          type: DataTypes.INTEGER,
      });
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn('games', 'max_player');
  }
};