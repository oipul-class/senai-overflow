//import do express
const express = require("express");

//import das rotas
const routes = require("./routes");

//import da conexão 
require("./database");

//criando app express
const app = express();

//abilitando o uso de json
app.use(express.json());

//usando as rotas programadas
app.use(routes);


//exportando o app
module.exports = app;