//importando 
const { Model, DataTypes } = require("sequelize");

//criando classe
class Aluno extends Model {
    //criando metodo init
    //aqui inicializamos nossos campos da tabela
    static init(sequelize){
        //inicialização do model
        super.init(
            
            {
                //iniciando variaveis
                ra: DataTypes.STRING,
                nome: DataTypes.STRING,
                email: DataTypes.STRING,
                senha: DataTypes.STRING
            },
            
            //configando model
            {
                // tableName: "" - caso o nome da tablea seja diferente do que esta na model
                sequelize,
            }
        )
    }

    static associate(models) {
        //fazer ligações entre tabelas
    }

}

module.exports = Aluno;