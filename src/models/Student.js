//importando 
const { Model, DataTypes } = require("sequelize");

//criando classe
class Student extends Model {
    //criando metodo init
    //aqui inicializamos nossos campos da tabela
    static init(sequelize){
        //inicialização do model
        super.init(
            
            {
                //iniciando variaveis
                ra: DataTypes.STRING,
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                image: DataTypes.STRING
            },
            
            //configando model
            {
                // tableName: "" - caso o nome da tablea seja diferente do que esta na model
                sequelize,
            }
        )
    }

    static associate(models) {
        this.hasMany(models.Question);
        this.hasMany(models.Answer); 
    }

}

module.exports = Student;