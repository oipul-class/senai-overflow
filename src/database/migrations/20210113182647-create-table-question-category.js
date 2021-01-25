'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("question_category", {
    
      question_id : { //chave estrangeira
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { //referencia da chave 
          model: "questions",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      category_id : { //chave estrangeira
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { //referencia da chave 
          model: "categories",
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

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("question_category");
  }
};
