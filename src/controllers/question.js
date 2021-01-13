const Pergunta = require("../models/Question");
const Aluno = require("../models/Student");


module.exports = {
    async index( req, res ) { //listar tudo
        
        try {
            
            let perguntas = await Pergunta.findAll();

            res.send(perguntas);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }

    },

    async store( req, res ) { //inserir
        const { titulo, descricao, imagem, gist, categorias } = req.body;

        const alunoId = req.headers.authorization;


        try {
           
            //buscar o Aluno pelo ID
            let aluno = await Aluno.findByPk(alunoId);

            //se Aluno não existir, retorna erro
            if (!aluno) 
                return res.status(404).send({ error: "Aluno não encontrado"});

            //crio a Pergunta para o Aluno
            let pergunta = await aluno.createQuestion({ titulo, descricao, imagem, gist });

            await pergunta.addCategories(categorias);

            console.log(pergunta);
            //retorno sucesso
            res.status(201).send(pergunta);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
        
    },

    find( req, res ) { //GET'S que busca por ID

    },

    async update( req, res ) {//atualizar
        
        const alunoId = req.headers.authorization;

        const perguntaID = req.params.id;

        try {
            
             //buscar o Aluno pelo ID
             let aluno = await Aluno.findByPk(alunoId);

             //se Aluno não existir, retorna erro
             if (!aluno) 
                 return res.status(404).send({ error: "Aluno não encontrado"});

            //modificação da partgunta
            let pergunta = await Pergunta.findByPk(perguntaID);

            if (!pergunta)
                return res.status(404).send({ error: "Pergunta não encontrada" });

            pergunta = await Pergunta.findOne({where: { aluno_id: alunoId }});

            if (!pergunta)
                return res.status(401).send({ error: "Não autorizado" });

            const { titulo, descricao } = req.body;
            
            pergunta.titulo = titulo;
            pergunta.descricao = descricao;

            await pergunta.save();

            res.status(201).send(pergunta);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }

    },

    async delete( req, res ) {//deletar
        const AlunoId = req.headers.authorization;

        const PerguntaID = req.params.id;

         try {

            //buscar o Aluno pelo ID
            let aluno = await Aluno.findByPk(AlunoId);

            //se Aluno não existir, retorna erro
            if (!aluno) 
                return res.status(404).send({ error: "Aluno não encontrado"});

            let pergunta = await Pergunta.findOne({
                where: {
                    id: PerguntaID,
                    aluno_id: AlunoId
                }
            });

            pergunta.destroy();

            res.send(200).send({
                status: "deletado",
                pergunta: pergunta
            })

         } catch (error) {
            console.log(error);
            res.status(500).send({ error });
         }
    }
};