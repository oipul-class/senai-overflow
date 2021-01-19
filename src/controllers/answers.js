const Question = require("../models/Question");
const Student = require("../models/Student");
const Answer = require("../models/Answer");

module.exports = {
    //função de listagem de respostas
    async index( req, res ) {

        try {
            
            const responses = await Answer.findAll();

            res.send(responses);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }

    },

    //função de listagem de resposta com filtro
    async find( req, res ) {

        const question_id = req.query.pergunta;
        const student_id = req.query.aluno;

        if (!question_id && !student_id)
            return res.status(400).send({error: "não foi colocado algo no filtro"});

        if (question_id && !student_id) {
            const responses = await Answer.findAll({
                where: {QuestionId: question_id}
            });

            return res.send(responses)
        }  
        
        if (student_id && !question_id) {
            const responses = await Answer.findAll({
                where: {StudentId: student_id}
            });

            return res.send(responses)
        } else {
            const responses = await Answer.findAll({
                where: {
                    StudentId: student_id,
                    QuestionId: question_id
                }
            });

            return res.send(responses)
        }
            

    },
    
    //função de inserção de resposta
    async store( req, res ) {

        try {

            const {answer}  = req.body;

            const question_id = req.params.id

            const { studentId } = req;
            
            let student = await Student.findByPk(studentId);

            if (!student)
                return res.status(404).send({error: "aluno não existe"});

            let question = await Question.findByPk(question_id);

            if(!question)
                return res.status(404).send({error: "pergunta não existe"})

            let responses = await question.createAnswer({answer, student_id: studentId});

            return res.status(201).send(responses);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }

    },

    update( req, res ) {



    },

    async delete( req, res ) {

        const id = req.params.id

        const { studentId } = req
        try {
            
            const student = await Student.findByPk(studentId);

            if (!student)
                return res.status(404).send({ error: "aluno não existe"});

            const answer = await Answer.findOne({
                where: {
                    id,
                    student_id: student_id
                }
            });

            if (!answer)
                return res.status(404).send({error: "resposta não encontrada"});
            
            await answer.destroy();
            
            res.status(200).send({
                status: "deletada"
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }


    }
};