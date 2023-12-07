require('dotenv').config();
const express = require("express");
const http = require("http");
const cors = require("cors");

const port = process.env.PORT || 5050;
const { connectDB } = require("./config/db.js");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded(true));
app.use(cors({ 
    origin: ['http://82.20.49.101', 'http://localhost:3000', '*'], 
    credentials: true 
  }));
  
app.use("/User", require("./routes/userRoute.js"));
app.use("/Python", require("./routes/callPythonRoute.js"));
app.use("/Storage", require("./routes/storageRoute.js"));
app.use("/", (req, res) => res.status(200).json(true));
let server = http.createServer(app);
server.listen(port, () => console.log(`Server started on port ${port}`));


module.exports = server;
