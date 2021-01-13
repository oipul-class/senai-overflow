//importando 
const { Model, DataTypes } = require("sequelize");

//criando classe
class Question extends Model {
    //criando metodo init
    //aqui inicializamos nossos campos da tabela
    static init(sequelize){
        //inicialização do model
        super.init(
            
            {
                //iniciando variaveis
                titulo: DataTypes.STRING,
                descricao: DataTypes.STRING,
                imagem: DataTypes.STRING,
                gist: DataTypes.STRING
            },
            
            //configando model
            {
                // tableName: "" - caso o nome da tablea seja diferente do que esta na model
                sequelize,
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.Student); //fazendo associação
        this.belongsToMany(models.Category, { foreignKey: "question_id", through: "question_category"}) 
    }

};

module.exports = Question;