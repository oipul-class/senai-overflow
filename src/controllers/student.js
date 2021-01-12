const Aluno = require("../models/Student");
//const { Op } = require("sequelize");


//export de funçoes
module.exports = {

    //função de listagem de Aluno
    async listarAlunos(req, res) {
        
        try {
            //lista de Aluno 
            const Alunos = await Aluno.findAll();

            //enviando a lista de Alunos
            res.send(Alunos);
        } catch(error) {
            console.log(error);
            res.status(500).send({ error });

        }
        
    },

    //função de buscar Aluno por ID
    async buscarAluno(req, res) {
            try {
                //pegando o valor no parametro
                const id = req.params.id;


                const aluno = await Aluno.findByPk(id, {
                    attributes: ["id", "ra", "nome", "email", "createdAt", "updatedAt"] //busca por chave primaria e apenas puxa atributos mencionados
                });
                
                if (aluno) {

                    //enviar dados
                    res.status(200).send(aluno);
                } else {
                    res.status(404).send({error : "Aluno não encontrado"});
                }

            } catch (error) {
                res.status(500).send({ error });
            }
    },

    //função de inserção de Aluno
    async inserirAluno(req, res) {
        
        //ira ententar o que esta dentro das chaves
        try {
            //variaveis puxada direto do body
            const { ra, nome, email, senha } = req.body;
            
            const AlunoRA = await Aluno.findOne({
                // [Op.or] : { where: { ra } } - ira trocar o operador AND pra OR
                where: { ra }
            }); //findOne({ where - busca algo por igualdade}) --caso não encontre algo ira retorna null

            if (AlunoRA==null) {
                let aluno = await Aluno.create({ra, nome, email, senha})

                res.status(201).send(aluno);    
            } else {
                res.status(400).send({ error:"RA não pode ser igual ao de outro Aluno" });
            }

            
        } catch(error) { //caso qualquer promesa der erro ele ira pular pro catch automaticamente

            res.status(500).send({ error });
           
        }
        
        //old version
        // //variavel com o proximo id
        // const nextId = Alunos.length > 0 ?  Alunos[Alunos.length - 1].id + 1 : 1;

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
        // Alunos.push(newBody);
    },

    //função de deleta um Aluno por id
    async deletarAluno(req, res) {
        try {
            const id = req.params.id;

            const aluno = await Aluno.findByPk(id, {
                attributes: ["id", "ra", "nome", "email",   "createdAt", "updatedAt"]
            })

            if (!aluno) 
                return res.status(404).send({ error: "Aluno não encontrado"});
            else {
                aluno.destroy()
                
                res.status(200).send({status: "Aluno deletado", aluno })
            }
        } catch (error) {
            res.status(500).send({ error })
        }
    },

    //função de editar por id
    async editarAluno(req, res) {
        try {
            //puxar id dos parametros
            const id = req.params.id;

            //pegar o corpo
            const { nome, email, senha} = req.body;

            const aluno = await Aluno.findByPk(id);

            if (!aluno) {
                return res.status(404).send({ error: "Aluno não encontrado"});
            } else {
                
                if (nome!="" && nome!=null) {
                    aluno.nome = nome
                }

                if (email!="" && email!=null) {
                    aluno.email = email
                }

                if (senha!="" && senha!=null) {
                    aluno.senha = senha
                }

                aluno.save()

                res.status(201).send(aluno);
            }

        } catch (error) {
            res.status(500).send({ error })
        }

        

    }



};


    
