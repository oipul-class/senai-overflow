'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("answers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      answer: {
        type: Sequelize.TEXT,
        allloNull: false
      },

      student_id : { //chave estrangeira
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { //referencia da chave 
          model: "students",
          key: "id"
        } 
      },

      question_id : { //chave estrangeira
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { //referencia da chave 
          model: "questions",
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
    queryInterface.dopTable("answers");
  }
};
