const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
let app = express()


app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });



let personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    balance: Number,
  });

let store = {}
store.accounts = []

app.get('/accounts', (req, res) => {
    res.status(200).send(store.accounts)
})

app.get('/accounts/:id', (req, res) => {
    res.status(200).send(store.accounts[req.params.id])
})

app.post('/accounts', (req, res) => {
    let newAccount = req.body
    let id = store.accounts.length
    store.accounts.push(newAccount)
    res.status(201).send({ id: id })
})

app.put('/accounts/:id', (req, res) => {
    store.accounts[req.params.id] = req.body
    res.status(200).send(store.accounts[req.params.id])
})

app.delete('/accounts/:id', (req, res) => {
    store.accounts.splice(req.params.id, 1)
    res.status(204).send()
})

app.listen(3000)