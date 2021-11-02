module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'Products', // 테이블의 이름을 지정합니다.
      {
       name: {
        type: DataTypes.STRING(30),
        allowNull : false
       },
       productID: {
        type: DataTypes.STRING(20),
        primaryKey : true,
        allowNull : false
       },
       supplierName: {
        type: DataTypes.STRING(30),
        allowNull : false
       },
      },
      {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
      }
  )};