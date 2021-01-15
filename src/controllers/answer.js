const Pergunta = require("../models/Question");
const Aluno = require("../models/Student");
const Answer = require("../models/Answer");

module.exports = {
    async index( req, res ) {

        try {
            
            const respostas = await Answer.findAll();

            res.send(respostas);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }

    },

    async find( req, res ) {

        const question_id = req.query.pergunta;
        const student_id = req.query.aluno;

        if (!question_id && !student_id)
            return res.status(400).send({error: "não foi colocado algo no filtro"});

        if (question_id && !student_id) {
            const respostas = await Answer.findAll({
                where: {QuestionId: question_id}
            });

            return res.send(respostas)
        }  
        
        if (student_id && !question_id) {
            const respostas = await Answer.findAll({
                where: {StudentId: student_id}
            });

            return res.send(respostas)
        } else {
            const respostas = await Answer.findAll({
                where: {
                    StudentId: student_id,
                    QuestionId: question_id
                }
            });

            return res.send(respostas)
        }
            

    },
    
    async store( req, res ) {

        try {

            const {answer}  = req.body;

            const perguntaId = req.params.id

            const student_id = req.headers.authorization;
            
            let aluno = await Aluno.findByPk(student_id);

            if (!aluno)
                return res.status(404).send({error: "aluno não existe"});

            let pergunta = await Pergunta.findByPk(perguntaId);

            if(!pergunta)
                return res.status(404).send({error: "pergunta não existe"})

            let resposta = await pergunta.createAnswer({answer, student_id});

            return res.status(201).send({resposta});

        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }

    },

    update( req, res ) {



    },

    delete( req, res ) {



    }
};