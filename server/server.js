const express = require("express");
const http = require("http");
const port = process.env.PORT || 5050;
const { connectDB } = require("./config/db.js");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded(false));

app.use("/User", require("./routes/userRoute.js"));

let server = http.createServer(app);
server.listen(port, () => console.log(`Server started on port ${port}`));


module.exports = server;
