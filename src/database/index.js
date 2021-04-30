const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//imports dos models
const Student = require("../models/Student");
const Question = require("../models/Question");
const Category = require("../models/Category");
const Answer = require("../models/Answer");

//criando conexão com o banco
const conexao = new Sequelize(dbConfig);

//inicializa os models
Student.init(conexao);
Question.init(conexao);
Category.init(conexao);
Answer.init(conexao);

//inicializa os relacionamentos
Student.associate(conexao.models);
Question.associate(conexao.models);
Category.associate(conexao.models);
Answer.associate(conexao.models);
