const Student = require("../models/Student")
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");

module.exports = {

    async store(req, res) {
    
        const {email, password} = req.body;
        
        try {
            
            const student = await Student.findOne({
                where: {
                    email
                }
            });

            if (!student || !bcrypt.compareSync(password, student.password) )
                return res.status(403).send({ error: "Usuario e/ou senha inválidos"});
            /* metodos para comparação
            compare(variavel, variavel para comparação) = retorna um promise
            compareSync(variavel, variavel para comparação) = retorna true se for igual
            */
            
            const token = generateToken({
                studentId: student.id,
                studentName: student.name
            });
            
            /* 
            
            jwt.sign(payload, auth.secret)

            payload -> informações do usuario

            secret -> base
            
            */

            res.status(201).send({
                student: {
                    studentId: student.id,
                    studentName: student.name,
                    studentRA: student.ra
                },
                token
            });

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    
    }

}