const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'Trades', // 테이블의 이름을 지정합니다.
      {
       transactionNumber: {
        type: DataTypes.STRING(20),
        primaryKey : true,
        allowNull : false
       },
       price: {
        type: DataTypes.DECIMAL(10,5),
        allowNull : false
       },
       date: {
        type: DataTypes.STRING(10),
        allowNull : false
       },
    },
      {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
      }
  )};


  // customerName: {
  //   type: DataTypes.STRING(30),
  //   allowNull : false  
  // },
  // productID : {
  //   type: DataTypes.STRING(20),
  //   allowNull : false
  // },