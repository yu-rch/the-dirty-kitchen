// To run: node server.js  (or npx nodemon server.js)
const express = require("express")
const cors = require('cors')
const commentRoutes = require('./routes/commentRoutes')
require('./db');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', commentRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// app.use(express.urlencoded({extended:true})) --FOR MAKING UR OWN API TO SEE ON POSTMAN