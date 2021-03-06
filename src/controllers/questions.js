const Question = require("../models/Question");
const Student = require("../models/Student");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    //listar tudo

    try {
      let questions = await Question.findAll();

      res.send(questions);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async store(req, res) {
    //inserir
    const { title, description, gist, categories } = req.body;

    const { firebaseUrl } = req.file ? req.file : "";

    const categoriesArray = categories.split(",");

    const { studentId } = req;

    try {
      //buscar o Student pelo ID
      let student = await Student.findByPk(studentId);

      //se Student não existir, retorna erro
      if (!student)
        return res.status(404).send({ error: "Aluno não encontrado" });

      //crio a Question para o Student
      let question = await student.createQuestion({
        title,
        description,
        image: firebaseUrl,
        gist,
      });

      await question.addCategories(categoriesArray);

      console.log(question);
      //retorno sucesso
      res.status(201).send(question);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async find(req, res) {
    const { searchParams } = req.query;

    const questions = await Question.findAll({
      attributes: ["id", "title", "description", "image", "gist", "createdAt"],
      where: {
          title: { [Op.substring]: searchParams }
      },
      include: [
        {
          association: "Student",
          attributes: ["id", "image", "name"],
        },

        {
          association: "Categories",
          through: { attributes: [] },
          attributes: ["id", "description"],
        },

        {
          association: "Answers",
          attributes: ["id", "answer", "createdAt"],
          include: {
            association: "Student",
            attributes: ["id", "image", "name"],
          },
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.send(questions);
  },

  async update(req, res) {
    //atualizar

    const { studentId } = req;

    const question_id = req.params.id;

    try {
      //buscar o Student pelo ID
      let student = await Student.findByPk(studentId);

      //se Student não existir, retorna erro
      if (!student)
        return res.status(404).send({ error: "Student não encontrado" });

      //modificação da partgunta
      let question = await Question.findByPk(question_id);

      if (!question)
        return res.status(404).send({ error: "Question não encontrada" });

      question = await Question.findOne({
        where: {
          id: question_id,
          student_id,
        },
      });

      if (!question) return res.status(401).send({ error: "Não autorizado" });

      const { title, description } = req.body;

      question.title = title;
      question.description = description;

      await question.save();

      res.status(201).send(question);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async delete(req, res) {
    //deletar
    const { studentId } = req;

    const question_id = req.params.id;

    try {
      //buscar o Student pelo ID
      let student = await Student.findByPk(studentId);

      //se Student não existir, retorna erro
      if (!student)
        return res.status(404).send({ error: "Student não encontrado" });

      let question = await Question.findOne({
        where: {
          id: question_id,
          student_id: studentId,
        },
      });

      question.destroy();

      res.send(200).send({
        status: "deletado",
        pergunta: question,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};
