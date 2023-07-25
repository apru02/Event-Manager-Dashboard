const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.BASE_URI || 5000;
const path = require('path');
const mailRoute = require('./routes/mail')

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



