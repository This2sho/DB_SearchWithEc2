'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'db.json'))[
    env
  ];
const db = {};

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
      }
    }
  );
  
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database: ', err);
    });

    db.Customers = require('./customers')(sequelize, Sequelize);
    db.Trades = require('./trades')(sequelize, Sequelize);
    db.Products = require('./products')(sequelize, Sequelize);
    
    //   1 대 1 관계 (Teacher : Class)
    //db.Teacher.hasOne(db.Class);

  // 1 대 M 관계 (Customer : Trade)

  //   db.Customers.hasMany(db.Trades, {
  //     foreignKey: 'customerName',
  //     sourceKey : 'name'
  // });
    db.Trades.belongsTo(db.Customers, {
      foreignKey : 'customerName',
      targetKey : 'name'
    });

    // 1 대 M 관계 (Product : Trade)
  //   db.Products.hasMany(db.Trades, {
  //     foreignKey: 'productID',
  //     sourceKey : 'productID'
  // });
    db.Trades.belongsTo(db.Products, {
      foreignKey : 'productID',
      targetKey : 'productID'
    }); 


    //   N 대 M 관계 (Teachers : Classes)
  //   db.Transaction.belongsToMany(db.Product, {
  //     through : 'scedule',
  //     foreignKey : 'productid'
  // });
  //   db.Transaction.belongsToMany(db.Customer, {
  //     through : 'scedule',
  //     foreignKey : 'customerName'
  // });
db.secret = '(9*)5$&!3%^0%^@@2$1!#5@2!4';
module.exports = db;