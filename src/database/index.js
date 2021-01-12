const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//imports dos models
const Student = require("../models/Student");
const Question = require("../models/Question");

//criando conexão com o banco
const conexao = new Sequelize(dbConfig);

//inicializa os models
Student.init(conexao);
Question.init(conexao);

//inicializa os relacionamentos
Student.associate(conexao.models);
Question.associate(conexao.models);