// dependency'ler ekleniyor
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express() // express app yaratılıyor

const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const uri = 'mongodb+srv://serifeturksever:Cityguideapp8.@cluster0.uouvvor.mongodb.net/test'
var client;
var mongoClient = new MongoClient(uri)
mongoClient.connect((err, db) => { // returns db connection
    if (err != null) {
        console.log(err)
        return
    }
    client = db
})

// dependency'ler kullanılıyor
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.get('/todo', (req, res) => {
    const cols = client.db("deneme").collection("todos")
    cols.find().toArray(function (err, results) {
        if (err) {
            console.log(err)
            res.send([])
            return
        }

        res.send(results)
    })
})
app.post('/addTodo', (req, res) => {
    const col = client.db('deneme').collection('todos')
    var todo = req.body.todo;
    col.insertOne({ title: todo }, function (err, results) {
        if (err) {
            console.log(err);
            res.send('');
            return
        }
        // console.log(results.insertedId)
        res.send(results);
    })
})
app.post('/deleteTodo', (req, res) => {
    const collection = client.db('deneme').collection('todos')
    collection.deleteOne({'_id': mongo.ObjectID(req.body.todoID)},
      function (err, results) {
        if (err) {
          console.log(err)
          res.send('')
          return 
        } 
        res.send() 
     }) 
  })
// client 8080 server 8081'de çalışacak
app.listen(process.env.PORT || 8081)