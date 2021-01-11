module.exports = {
    host:"localhost", 
    username:"root", // nome de usuario
    password: "bcd127", // senha
    database: "senai_overflow", // nome do banco de dados
    dialect: "mysql", //qual database vai ser
    define: {
        timestamp: true, //hora de inserção 
        underscored: true // troca de TestTest pra test_test
    }
}