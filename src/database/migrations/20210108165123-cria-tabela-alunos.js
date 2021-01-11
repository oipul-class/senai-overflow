'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //aqui dizemos o que deve ser criado
    
    //queryInterface.createTable("nome da tabela", {dados})
    queryInterface.createTable("alunos",{
      // criando campo
      id: {
        type: Sequelize.INTEGER, //colocando o tipo do campo
        primaryKey: true, // colocando como chave primaria
        autoIncrement: true // colocando para ser auto incrementada
      },

      ra: {
        type: Sequelize.STRING,
        allowNull: false, //não permitir que o campo seje null
        unique: true //não permitir o mesmo valor no banco
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false, 
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false, 
      },

      senha: {
        type: Sequelize.STRING,
        allowNull: false, 
      },

      //campo para guardar quando os dados foram criados
      created_at: {
        type: Sequelize.DATE ,
        allowNull: false,
      },
      
      //campo para guardar a ultima vez atualizada
      updated_at: {
        type: Sequelize.DATE ,
        allowNull: false,
      
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    //aqui dizemos o que deve ser desfeito
    queryInterface.dropTable("alunos");
  }
};
