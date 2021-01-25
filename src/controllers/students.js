const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");

//export de funçoes
module.exports = {

    //função de listagem de Student
    async index(req, res) {
        
        try {
            //lista de Student 
            const students = await Student.findAll();

            //enviando a lista de Students
            res.send(students);
        } catch(error) {
            console.log(error);
            res.status(500).send({ error });

        }
        
    },

    //função de buscar Student por ID
    async find(req, res) {
            try {
                //pegando o valor no parametro
                const id = req.params.id;


                const student = await Student.findByPk(id, {
                    attributes: ["id", "ra", "name", "email", "createdAt", "updatedAt"] //busca por chave primaria e apenas puxa atributos mencionados
                });
                
                if (student) {

                    //enviar dados
                    res.status(200).send(student);
                } else {
                    res.status(404).send({error : "Aluno não encontrado"});
                }

            } catch (error) {
                res.status(500).send({ error });
            }
    },

    //função de inserção de Student
    async store(req, res) {
        
        //ira ententar o que esta dentro das chaves
        try {
            //variaveis puxada direto do body
            const { ra, name, email, password } = req.body;
            
            const studentCheck = await Student.findOne({
                // [Op.or] : { where: { ra } } - ira trocar o operador AND pra OR
                 where: {ra}
            }); //findOne({ where - busca algo por igualdade}) --caso não encontre algo ira retorna null


            if (studentCheck) 
                return res.status(400).send({ error:"Aluno já cadastrado" });
            
                
            const passwordCrypt = bcrypt.hashSync(password);
            
            /* metodos de criptografia
            hash(variavel) -> retorna uma promise
            hashsync(variavel) -> retorna a criptografia
            
            */

            let student = await Student.create({ra, name, email, password: passwordCrypt})
            
            const token = generateToken({
                studentId: student.id,
                studentName: student.name
            });

            res.status(201).send(
            {
                student,
                token
            }); 
            
        } catch(error) { //caso qualquer promesa der erro ele ira pular pro catch automaticamente

            res.status(500).send({ error });
           
        }
        
        //old version
        // //variavel com o proximo id
        // const nextId = Students.length > 0 ?  Students[Students.length - 1].id + 1 : 1;

        // //re-construção do json com id 
        // const newBody = {
        //     id: nextId,
        //     ra: ra,
        //     nome: nome,
        //     email: email,
        //     senha: senha
        // };

        // //construção da resposta
        // const responseStatus = {
        //     "status":"sucess",
        //     "dado inserido": newBody

        // }

        // //inserção no "banco"
        // Students.push(newBody);
    },

    //função de deleta um Student por id
    async delete(req, res) {
        try {
            const id = req.params.id;

            const student = await Student.findByPk(id, {
                attributes: ["id", "ra", "name", "email", "createdAt", "updatedAt"]
            })

            if (!student) 
                return res.status(404).send({ error: "Aluno não encontrado"});
            else {
                student.destroy()
                
                res.status(200).send({status: "Aluno deletado", student })
            }
        } catch (error) {
            res.status(500).send({ error })
        }
    },

    //função de editar por id
    async update(req, res) {
        try {
            //puxar id dos parametros
            const id = req.params.id;

            //pegar o corpo
            const { name, email, password} = req.body;

            const student = await Student.findByPk(id);

            if (!student) {
                return res.status(404).send({ error: "Student não encontrado"});
            } else {
                
                if (name!="" && name!=null) 
                    student.name = name;

                if (email!="" && email!=null) 
                    student.email = email;

                if (password!="" && password!=null) {
                    const passwordCrypt = bcrypt.hashSync(password);
                    
                    student.password = passwordCrypt;
                }

                await student.save()

                res.status(201).send(student);
            }

        } catch (error) {
            res.status(500).send({ error })
        }

        

    }



};


    
