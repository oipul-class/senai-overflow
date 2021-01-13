const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//imports dos models
const Student = require("../models/Student");
const Question = require("../models/Question");
const Categories = require("../models/Category");

//criando conexão com o banco
const conexao = new Sequelize(dbConfig);

//inicializa os models
Student.init(conexao);
Question.init(conexao);
Categories.init(conexao);

//inicializa os relacionamentos
Student.associate(conexao.models);
Question.associate(conexao.models);
Categories.associate(conexao.models);

for (let assoc of Object.keys(Question.associations)) {
    for (let accessor of Object.keys(Question.associations[assoc].accessors)) {
        console.log(Question.name + '.' + Question.associations[assoc].accessors[accessor] + '()');
    }
}