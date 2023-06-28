const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const app = express();
const port = 5000;
const path = require('path');
const mailRoute = require('./routes/mail')
require('dotenv').config();

// Connect to MongoDB
connectDB();
app.use(cors());

// Middleware
app.use(express.json());

// Routes

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/event", require("./routes/events"));
app.use("/api/chat", require("./routes/chats"));
app.use("/api/meet", require("./routes/meets"));
app.use("/api/sendmail", mailRoute);
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



