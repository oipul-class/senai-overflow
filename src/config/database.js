require("dotenv").config();

module.exports = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  dialect: "mysql", //qual database vai ser
    define: {
        timezone: "-2:00",
        timestamp: true, //hora de inserção
        underscored: true, // troca o padrão cameCase pra underscored
    },
  
};
