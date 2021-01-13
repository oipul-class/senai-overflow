//importando 
const { Model, DataTypes } = require("sequelize");

//criando classe
class Category extends Model {
    //criando metodo init
    //aqui inicializamos nossos campos da tabela
    static init(sequelize){
        //inicialização do model
        super.init(
            
            {
                //iniciando variaveis
                description: DataTypes.STRING,
            },
            
            //configando model
            {
                // tableName: "" - caso o nome da tablea seja diferente do que esta na model
                sequelize,
            }
        )
    }

    static associate(models) {
        this.belongsToMany(models.Question, { foreignKey: "categories_id", through: "question_category"})
    }

}

module.exports = Category;