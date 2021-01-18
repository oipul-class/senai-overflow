//import do express
const express = require("express");

//Controllers
const studentController = require("./controllers/student");
const questionController = require("./controllers/question");
const answerController = require("./controllers/answer");
const feedController = require("./controllers/feed");

//criando uma instancia router do express
const routes = express.Router();


//--------------inicio das rotas de students---------------

//configuração de rotas
//endpoint GET de listagem de students
routes.get("/students" , studentController.listarAlunos);

//endpoint GET de listagem de um student por id
routes.get("/students/:id" , studentController.buscarAluno);

//endpoint POST de inserção de student
routes.post("/students" , studentController.inserirAluno);

//endpoint DELETE de deleta um student por id
///(endpoint/:(variavel)) = parametro
routes.delete("/students/:id" , studentController.deletarAluno);

//endpoint PUT de edição de um student por id
routes.put("/students/:id" , studentController.editarAluno);

//--------------final das rotas de students---------------



//--------------inicio de rotas de questions------------

routes.get("/questions", questionController.index); 

routes.post("/questions", questionController.store);

routes.put("/questions/:id", questionController.update);

routes.delete("/questions/:id", questionController.delete)

//--------------final de rotas de questions-------------


//--------------inicio de rotas de answers------------

routes.get("/anwsers", answerController.index);

routes.get("/anwsers/filter", answerController.find);

routes.post("/questions/:id/anwsers", answerController.store);

routes.delete("/answer/:id" , answerController.delete);
//--------------final de rotas de answers------------


//--------------inicio de rotas de feed------------

routes.get("/feed", feedController.index);


//--------------final de rotas de feed------------

//export do routes
module.exports = routes;