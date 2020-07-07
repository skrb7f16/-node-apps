const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path');
const port = 80;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected")
});

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    message: String,
});
const Contact = mongoose.model('Contact', contactSchema);



const app = express()

app.use('/static',express.static('static'));
app.use(express.urlencoded())

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.status(200).render('index.pug');
})

app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug')
})

app.post('/contact',(req,res)=>{
    var MyData = new Contact(req.body);
    MyData.save().then(()=>{
        res.status(200).send("saved");
    }).catch(()=>{
        res.status(400).send("Error");
    })
})


app.listen(port,()=>{
    console.log("running and kicking")
})