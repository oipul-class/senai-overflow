'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [ //varios inserts na tabela
      {
      
      description: 'Projetos',
      created_at: new Date(),
      updated_at: new Date()

      }, 

      {

      description: 'Mobile Frontend',
      created_at: new Date(),
      updated_at: new Date()
      
      },
      
      {

        description: 'Mobile Backend',
        created_at: new Date(),
        updated_at: new Date()
        
        },

        {

          description: 'Sistema Operacionais',
          created_at: new Date(),
          updated_at: new Date()
          
        },

        {

          description: 'Hardware e redes',
          created_at: new Date(),
          updated_at: new Date()
          
        },

        {

          description: 'Banco de Dados',
          created_at: new Date(),
          updated_at: new Date()
          
        },

        {

          description: 'Teste de software',
          created_at: new Date(),
          updated_at: new Date()
          
        }],
      
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {}); //deletar tudo da tabela
  }
};
