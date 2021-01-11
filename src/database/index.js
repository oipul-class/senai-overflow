const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//imports dos models
const Aluno = require("../models/Aluno");

//criando conexão com o banco
const conexao = new Sequelize(dbConfig);

//inicializa os models
Aluno.init(conexao);


//inicializa os relacionamentos
Aluno.associate(conexao.models);