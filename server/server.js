//(1)put a json in this-cmd-npm init
//(2)then npm install express for lock.json
//(3) try to run node server.js then npm install -g nodemon to auto update server
//(4)to run the server - nodemon server.js or npx nodermon server.js
//(5) cmd npm install @faker-js/faker-- ALWAYS RUN THE SERVER TO SEE IT ON THE POSTMAN
//(6) after putting data on database- npm init -y |then| npm install mongoose-|then| npm install cors
//(7) run server then connect the database-go to modelsto create schema
const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const commentRoutes = require('./routes/commentRoutes')
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', commentRoutes);

mongoose.connect("mongodb://localhost:27017/dirtykitchen");

app.listen(3000, ()=> {
    console.log('Server is running at http:localhost:8000');
});

// app.use(express.urlencoded({extended:true})) --FOR MAKING UR OWN API TO SEE ON POSTMAN