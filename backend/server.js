
const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]); 

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

//connect db
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server started');
})

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`App listening on port ${port}`);
    
})