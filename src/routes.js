//import do express
const express = require("express");

const alunoController = require("./controllers/alunos");

//criando uma instancia router do express
const routes = express.Router();



//configuração de rotas
//endpoint GET de listagem de alunos
routes.get("/alunos" , alunoController.listarAlunos);

//endpoint GET de listagem de um aluno por id
routes.get("/alunos/:id" , alunoController.buscarAluno);

//endpoint POST de inserção de aluno
routes.post("/alunos" , alunoController.inserirAluno);

//endpoint DELETE de deleta um aluno por id
///(endpoint/:(variavel)) = parametro
routes.delete("/alunos/:id" , alunoController.deletarAluno);

//endpoint PUT de edição de um aluno por id
routes.put("/alunos/:id" , alunoController.editarAluno);

//export do routes
module.exports = routes;