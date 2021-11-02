module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'Customers', // 테이블의 이름을 지정합니다.
      {
       name: {
        type: DataTypes.STRING(30),
        primaryKey : true,
        allowNull : false
       },
       phone: {
        type: DataTypes.STRING(20),
        allowNull : false
       },
       address: {
        type: DataTypes.STRING(50),
        allowNull : false
       },
       gender: {
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
