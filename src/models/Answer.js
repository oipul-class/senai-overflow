//importando 
const { Model, DataTypes } = require("sequelize");

//criando classe
class Answer extends Model {
    //criando metodo init
    //aqui inicializamos nossos campos da tabela
    static init(sequelize){
        //inicialização do model
        super.init(
            
            {
                //iniciando variaveis
                answer: DataTypes.TEXT,
                student_id: DataTypes.INTEGER
            },
            
            //configando model
            {
                // tableName: "" - caso o nome da tablea seja diferente do que esta na model
                sequelize,
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.Question);
        this.belongsTo(models.Student);
    }

}

module.exports = Answer;