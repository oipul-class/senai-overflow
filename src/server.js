const app = require("./app");

require("dotenv").config()

//criando porta
const port = process.env.PORT || 3333;

//rodando servidor
app.listen(port, () =>{
    console.log(`servidor rodando na porta ${port}`);
});


