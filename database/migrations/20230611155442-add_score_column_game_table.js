module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.addColumn('games', 'score', {
      type: DataTypes.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('games', 'score');
  }
};