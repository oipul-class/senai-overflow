const Question = require("../models/Question");
const Student = require("../models/Student");
const Answer = require("../models/Answer");

module.exports = {

    async index(req, res) {

        try {

            const feed = await Question.findAll({
                attributes: ["id", "title", "description", "image", "gist", "createdAt"],
                include: [
                
                    {
                        association: "Student",
                        attributes: ["id", "image", "name"]
                    },

                    {
                        association: "Categories",
                        through: { attributes: []},
                        attributes: ["id", "description"],
                                        
                    },
                    
                    {
                        association: "Answers",
                        attributes: ["id", "answer", "createdAt"],
                        include: { 
                            association: "Student",
                            attributes: ["id", "image", "name"]
                        }
                    }
                ],
                order: [["created_at", "DESC"]]
                
                
                // include: [
                //     { association: "Student", attributes:["name"] ,
                //     include: { association: "Answers", attributes:["answer", "createdAt"],
                //     include: { association: "Student", attributes: ["name"]
                // }}},
                //]
            })
            
            res.send(feed);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }

    }

};