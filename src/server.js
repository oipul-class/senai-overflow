const app = require("./app");

//criando porta
const port = 3333;

//rodando servidor
app.listen(port, () =>{
    console.log(`servidor rodando na porta ${port}`);
});


