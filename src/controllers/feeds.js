const Question = require("../models/Question");
const Student = require("../models/Student");
const Answer = require("../models/Answer");

module.exports = {

    async index(req, res) {

        try {

            const feed = await Question.findAll({
                attributes: ["title", "description", "image", "gist", "createdAt"],
                include: [
                
                    {
                        association: "Student",
                        attributes: ["id", "name"]
                    },

                    {
                        association: "Categories",
                        through: { attributes: []},
                        attributes: ["id", "description"],
                                        
                    },
                    
                    {
                        association: "Answers",
                        attributes: ["answer", "createdAt"],
                        include: { 
                            association: "Student",
                            attributes: ["id", "name"]
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