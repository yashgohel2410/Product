require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const QRCode = require('qrcode');
const bodyParser = require('body-parser');
const carRoutes = require('./routes/carRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const path = require("path");

app.use(morgan("tiny"));
// Configure Express to parse JSON requests
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/car', carRoutes);

app.use(express.static(path.resolve(__dirname, "..", "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

process.on("uncaughtException", (err) => {
  console.log(err);
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://test:admin@cluster0.322qg.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// // Start the server
// app.listen(PORT, () => {
//   console.log(`server started on url: http://localhost:${PORT}/`);
// });

