const Question = require("../models/Question");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const feedOffset = req.body.feedOffset ? req.body.feedOffset : 0;
      const feedLimit = req.body.feedLimit ? req.body.feedLimit : 1;

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
        order: [["created_at", "DESC"]],
        limit: [feedOffset, feedLimit]
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

      console.log(feed);

      res.send(feed);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};
