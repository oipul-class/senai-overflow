const jwt = require("jsonwebtoken");
const auth = require("../config/auth.json");

module.exports = (req, res, next) => {

    //pegando o campo authorization do cabeçalho do requesição
    const { authorization } = req.headers;

    //verificando se o campo existe/foi informado 
    if (!authorization)
        return res.status(401).send({ error: "Token não informado" }); //retorna que o token não foi informado

    //separa o prefixo do token
    const [ Bearer, token] =  authorization.split(" ");

    //verifica se o token está presente
    if (!token)
        return res.status(401).send({ error: "Token mal formatado" }); //retorna que o token foi mal formatado caso não exista

    try {
        
        //verifica se o token é valido
        const payload = jwt.verify(token, auth.secret);

        //coloca o id do aluno na requisição
        req.studentId = payload.studentId;

        //envia a requisição para o proximo (controller)
        return next();

    } catch (error) {
       res.status(401).send({ error: "Token Invalido"}); //caso o token seja invalido
    }
};