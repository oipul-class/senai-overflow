const Question = require("../models/Question");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const {page} = req.query
      
      const feed = await Question.findAll({
        attributes: [
          "id",
          "title",
          "description",
          "image",
          "gist",
          "createdAt",
          "StudentId"
        ],
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
        order: [["created_at", "ASC"]],
        limit: page ? [(page - 1) * 5, 5] : undefined,
      });

      res.send(feed)
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async find(req, res) {
    try {
      const { searchParams } = req.body;

      const feed = await Question.findAll({
        attributes: [
          "id",
          "title",
          "description",
          "image",
          "gist",
          "createdAt",
        ],
        where: {
          [Op.or]: {
            title: { [Op.substring]: searchParams },
            description: { [Op.substring]: searchParams },
          },
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

      res.send(feed);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};
