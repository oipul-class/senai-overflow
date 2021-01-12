const Pergunta = require("../models/Question");
const Aluno = require("../models/Student");


module.exports = {
    index( req, res ) { //listar tudo
        
    },

    async store( req, res ) { //inserir
        const { titulo, descricao, imagem, gist } = req.body;

        const AlunoId = req.headers.authorization;


        try {
           
            //buscar o Aluno pelo ID
            let Aluno = await Aluno.findByPk(AlunoId)

            //se Aluno não existir, retorna erro
            if (!Aluno) 
                return res.status(404).send({ error: "Aluno não encontrado"});

            //crio a Pergunta para o Aluno
            let Pergunta = await Aluno.createPergunta({ titulo, descricao, imagem, gist });

            console.log(Pergunta);
            //retorno sucesso
            res.status(201).send(Pergunta);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error })
        }
        
    },

    find( req, res ) { //GET'S que busca por ID

    },

    update( req, res ) {//atualizar

    },

    delete( req, res ) {//deletar

    }
};