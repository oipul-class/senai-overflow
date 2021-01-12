//import do express
const express = require("express");

//Controllers
const studentController = require("./controllers/student");
const questionController = require("./controllers/question");


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

routes.post("/perguntas", questionController.store);

//--------------final de rotas de questions-------------

//export do routes
module.exports = routes;