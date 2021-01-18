'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("questions",{

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false
      },

      description: {
        type: Sequelize.STRING,
        allowNull: false
      },

      image: {
        type: Sequelize.STRING,
        allowNull: true
      },

      gist: {
        type: Sequelize.STRING,
        allowNull: true
      },

      student_id : { //chave estrangeira
        type: Sequelize.INTEGER,
        references: { //referencia da chave 
          model: "students",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      created_at: {
        type: Sequelize.DATE ,
        allowNull: false,
      },
      
      updated_at: {
        type: Sequelize.DATE ,
        allowNull: false,
      
      }

    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("questions")
  }
};
