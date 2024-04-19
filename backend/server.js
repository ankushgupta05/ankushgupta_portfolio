const express = require('express')
const dotenv =  require('dotenv')
const { MongoClient } = require('mongodb');
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')


dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'portfolioankushDb';



// console.log(process.env) // remove this after you've confirmed it is working
console.log(process.env.MONGO_URI) 


const port = 3000
app.use(bodyparser.json())
app.use(cors())

app.use(express.static('public'))

client.connect();

app.get('/',async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('portfolioName');
  const findResult = await collection.find({}).toArray();
  console.log('Get req ..')
  // res.send('Hello World! get')
  res.json(findResult)
})

app.post('/',async (req, res) => {
  const dataName = req.body;
  const db = client.db(dbName);
  const collection = db.collection('portfolioName');
  const findResult = await collection.insertOne(dataName);
    console.log('post req ..')
  // res.send('Hello World! post')
  // res.send(req.body)
  res.send({success : true, result: findResult})

})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})