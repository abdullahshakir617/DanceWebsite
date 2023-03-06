const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
  
const port = 8000;

//Defining the mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    description: String
  });

const Contact = mongoose.model('Contact', contactSchema);


//EXPRESS SPECIFIC 
app.use("/static",express.static('static'));    //serving static files
app.use(express.urlencoded({extended: true}));

//PUG SPECIFIC
app.set('view engine', 'pug');   //set the template engine as pug
app.set('views', path.join(__dirname, 'views'));   //Set the views directory

//ENDPOINTS
app.get('/', (req,res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req,res)=>{
  const params = { }
  res.status(200).render('contact.pug', params);
  
  })

app.post('/contact', (req,res)=>{
    console.log(req.body);
    var myData = new Contact(req.body);
    myData.save().then(()=>{
      res.send("This data has been saved to the database")
    }).catch(()=>{
      res.status(400).send("Item was not saved to the database")
    })

    // res.status(200).render('contact.pug');
});

//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
 })
 