'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("question",{

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },

      descricao: {
        type: Sequelize.STRING,
        allowNull: false
      },

      imagem: {
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
        } 
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
    queryInterface.dropTable("question")
  }
};
