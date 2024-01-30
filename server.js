const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
let app = express()


app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });



let personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    balance: Number,
});

let Person = mongoose.model('Person', personSchema);

app.get('/accounts', async (req, res) => {
    res.status(200).send(await Person.find())
})

app.get('/accounts/:id', async (req, res) => {
    res.status(200).send(await Person.findById(req.params.id))
})

app.post('/accounts', async (req, res) => {
    await Person.create({
        name: req.body.name,
        balance: req.body.balance
    }).then(() => {
        res.status(201).send("worked")
    }).catch(() => {
        res.status(404).send("There has been an error creating an account")
    })
})

app.put('/accounts/:id', async (req, res) => {
    await Person.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        balance: req.body.balance
    }).then(() => {
        res.status(201).send("worked")
    }).catch(() => {
        res.status(404).send("There has been an error updating the account")
    })
})

app.delete('/accounts/:id', (req, res) => {
    store.accounts.splice(req.params.id, 1)
    res.status(204).send()
})

app.listen(3000)