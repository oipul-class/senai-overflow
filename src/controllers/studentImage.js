const Student = require("../models/Student");

module.exports = {
    async store(req, res) {
        const id = req.params.id;

        const { firebaseUrl} = req.file ? req.file : null;

        try {
            const student = await Student.findByPk(id);

            if (!student) return res.status(404).send({ error: "Student não encontrado"});
            else {
                student.image = firebaseUrl;
                
                await student.save()

                res.status(201).send({
                    "message":"imagem inserida",
                    "image": student.image
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }

    }
}