const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp_database'
});

const Model = Sequelize.Model;



module.exports= sequelize;
