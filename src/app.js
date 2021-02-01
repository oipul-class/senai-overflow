//import do express
const express = require("express");

//import das rotas
const routes = require("./routes");
const { errors } = require("celebrate");

const cors = require("cors");

//import da conexão 
require("./database");

//criando app express
const app = express();

//abilitando o uso de json
app.use(express.json());

//permição de site
app.use(cors())

//rota de visizualização de imagem
app.use("/uploads", express.static("uploads"))

//usando as rotas programadas
app.use(routes);
app.use(errors());

//exportando o app
module.exports = app;