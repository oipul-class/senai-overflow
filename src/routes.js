//import do express
const express = require("express");



//import do multer
const multer = require("multer")

//import dos middleware
const authMiddleware = require("./middleware/authorization");
const uploadImageMemoryStorage = require("./middleware/uploadImageMemoryStorage");
const uploadImageService = require("./services/firebase");

const studentMiddleware = require("./validators/student");
const questionMiddleware = require("./validators/question");
const answerValidator = require("./validators/answer");

//Controllers
const studentController = require("./controllers/students");
const studentImageController = require("./controllers/studentImage")
const questionController = require("./controllers/questions");
const answerController = require("./controllers/answers");
const feedController = require("./controllers/feeds");
const sessionController = require("./controllers/sessions");
const categoryController = require("./controllers/category");



//criando uma instancia router do express
const routes = express.Router();


const Multer = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 * 2 }
});



//instancia do multer

// const upload = multer.single("arquivo")

// routes.post("/upload", upload, (req, res) => {

//     const HandleError = (error) => {
//         if (error) {
//             res.status(400).send({ error: "Arquivo Invalido" });
//         }
//     };
//     console.log(req.file);

//     res.send(req.file);

//     upload(req, res, HandleError);
// });

//middleware = função que interpta a pedido para verificação, conversão e etc antes do pedido chegar no controller
// const middleware = (req, res, next) => {

//     console.log("passou pelo middleware");

//     if (req.body.name)
//         return next()
//     else
//         return res.status(400).send({ error: "não foi colocado o nome" })

//     //next() = função para avançar
// }

//--------------inicio das rotas publicas------------------

routes.post("/sessions", sessionController.store);

//endpoint POST de inserção de student
routes.post("/students", studentMiddleware.create, studentController.store);

//--------------final das rotas publicas-------------------

//mandando o routes usar o middleware
routes.use(authMiddleware);

//--------------inicio das rotas de students---------------

//configuração de rotas
//endpoint GET de listagem de students
routes.get("/students", studentController.index);

//endpoint GET de listagem de um student por id
routes.get("/students/:id", studentController.find);

//endpoint DELETE de deleta um student por id
///(endpoint/:(variavel)) = parametro
routes.delete("/students/:id", studentController.delete);

//endpoint PUT de edição de um student por id
routes.put("/students/:id", studentController.update);

//endpoint Post de adição/edição de imagem do student por id
routes.post(
  "/students/:id/image",
  uploadImageMemoryStorage,
  uploadImageService,
  studentImageController.store
);

//--------------final das rotas de students---------------

//--------------inicio de rotas de questions------------

routes.get("/questions", questionController.index);

routes.post(
  "/questions",
  uploadImageMemoryStorage,
  uploadImageService,
  questionMiddleware.create,
  questionController.store
);

routes.put("/questions/:id", questionController.update);

routes.delete("/questions/:id", questionController.delete);

//--------------final de rotas de questions-------------

//--------------inicio de rotas de answers------------

routes.get("/anwsers", answerController.index);

routes.get("/anwsers/filter", answerController.find);

routes.post(
  "/questions/:id/anwsers",
  answerValidator.create,
  answerController.store
);

routes.delete("/answer/:id", answerController.delete);
//--------------final de rotas de answers------------

//--------------inicio de rotas de feed------------

routes.get("/feed", feedController.index);

routes.post("/feed/search", feedController.find)

//--------------final de rotas de feed------------

//--------------inicio de rotas de categories------------

routes.get("/categories", categoryController.index);

//--------------final de rotas de categories------------

//export do routes
module.exports = routes;
