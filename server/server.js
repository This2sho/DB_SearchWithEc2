const express = require('express');
const app = express();

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser')
sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const {
    Customers,
    Products,
    Trades,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');

// Customer 관리 코드 //
app.post('/add/Customer', (req, res) => {
  console.log(req.body)

  Customers.create({
      name : req.body.name,
      phone : req.body.phone,
      address : req.body.address,
      gender : req.body.gender
      })
      .then( result => {
          res.send(result)
      })
      .catch( err => {
          console.log(err)
          throw err;
      })
})

app.post('/search/Customer', (req, res) => {
  console.log(req.body)
  
  Customers.findAll({
    where: { [Op.or] : [{name : req.body.name}, {phone : req.body.phone}, {address : req.body.address}, {gender : req.body.gender}] }
      })
      .then( result => {
          res.send(result)
      })
      .catch( err => {
          console.log(err)
          throw err;
      })
})

app.get('/get/Customer', (req, res) => {
  Customers.findAll()
  .then( result => { res.send(result) })
  .catch( err => { throw err })
})
// Customer 관리 코드 // 

// Product 관리 코드 //
app.post('/add/Product', (req, res) => {
  console.log(req.body)

  Products.create({
      name : req.body.name,
      productID : req.body.productID,
      supplierName : req.body.supplierName,
      })
      .then( result => {
          res.send(result)
      })
      .catch( err => {
          console.log(err)
          throw err;
      })
})

app.post('/search/Product', (req, res) => {
  console.log(req.body)

  Products.findAll({
    where: { [Op.or] : [{name : req.body.name}, {productID : req.body.productID}, {supplierName : req.body.supplierName}] }
      })
      .then( result => {
          res.send(result)
      })
      .catch( err => {
          console.log(err)
          throw err;
      })
})

app.get('/get/Product', (req, res) => {
  Products.findAll()
  .then( result => { res.send(result) })
  .catch( err => { throw err })
})
// Product 관리 코드 //

// Trade 관리 코드 //
app.post('/add/Trade', (req, res) => {
  console.log(req.body)

  Trades.create({
    transactionNumber : req.body.transactionNumber,
    productID : req.body.productID,
    price : req.body.price,
    date : req.body.date,
    customerName : req.body.customerName
      })
      .then( result => {
          res.send(result)
      })
      .catch( err => {
          console.log(err)
          throw err;
      })
})

app.post('/search/Trade', (req, res) => {
  console.log(req.body)

  Trades.findAll({
    where: { [Op.or] : [{transactionNumber : req.body.transactionNumber}, {productID : req.body.productID}, {price : req.body.price}, {date : req.body.date}, {customerName : req.body.customerName}] }
      })
      .then( result => {
        typeof(price)
          res.send(result)
      })
      .catch( err => {
          console.log(err)
          throw err;
      })
})

app.get('/get/Trade', (req, res) => {
  Trades.findAll()
  .then( result => { res.send(result) })
  .catch( err => { throw err })
})
// Trade 관리 코드 // 
//'select p.name,p.productID,p.supplierName from Products p, Trades t, (select F.name from Customers as F where F.gender ="Female") as Fe, (select M.name from Customers as M where M.gender ="Male") as Ma group by t.productID having count(t.customerName = Fe.name) > count(t.customerName = Ma.name)'
// SpecialSearch 관리 코드 //

app.post('/search/A', (req, res) => {
  console.log(req.body)
  sequelize.query('SELECT Products.name, Products.productID, Products.supplierName FROM Customers, Trades, Products WHERE Customers.name = Trades.customerName AND Products.productID = Trades.productID GROUP BY Products.productID HAVING COUNT(if(Customers.gender="Female", Customers.gender,null)) > COUNT(if(Customers.gender="Male", Customers.gender,null));')
  .then(result => { res.send(result) })
  .catch( err => { throw err })
})

app.post('/search/B', (req, res) => {
  sequelize.query('select res.name, res.productID, res.supplierName from Products as res ,(select productID from Trades where date < \''+req.body.date+'\' group by productID order by sum(price) desc limit '+req.body.num+' offset 0) as rq where res.productID=rq.productID')
  .then( result => { console.log(result),res.send(result) })
  .catch( err => { throw err })
})

app.post('/search/C', (req, res) => {
  console.log(req.body)
  sequelize.query('select t.customerName, p.supplierName, count(customerName) from  Trades t , Products p where p.productID = t.productID group by customerName,supplierName having  count(customerName) > '+req.body.num)
  .then( result => { console.log(result),res.send(result) })
  .catch( err => { throw err })
})
// SpecialSearch 관리 코드 // 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})