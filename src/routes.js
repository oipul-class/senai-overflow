//import do express
const express = require("express");

//Controllers
const studentController = require("./controllers/student");
const questionController = require("./controllers/question");
const answerController = require("./controllers/answer");

//criando uma instancia router do express
const routes = express.Router();


//--------------inicio das rotas de students---------------

//configuração de rotas
//endpoint GET de listagem de students
routes.get("/alunos" , studentController.listarAlunos);

//endpoint GET de listagem de um student por id
routes.get("/alunos/:id" , studentController.buscarAluno);

//endpoint POST de inserção de student
routes.post("/alunos" , studentController.inserirAluno);

//endpoint DELETE de deleta um student por id
///(endpoint/:(variavel)) = parametro
routes.delete("/alunos/:id" , studentController.deletarAluno);

//endpoint PUT de edição de um student por id
routes.put("/alunos/:id" , studentController.editarAluno);

//--------------final das rotas de students---------------



//--------------inicio de rotas de questions------------

routes.get("/perguntas", questionController.index); 

routes.post("/perguntas", questionController.store);

routes.put("/perguntas/:id", questionController.update);

routes.delete("/perguntas/:id", questionController.delete)

//--------------final de rotas de questions-------------


//--------------inicio de rotas de answers------------

routes.get("/respostas", answerController.index);

routes.get("/respostas/filter", answerController.find);

routes.post("/perguntas/:id/respostas", answerController.store);

//--------------final de rotas de answers------------

//export do routes
module.exports = routes;