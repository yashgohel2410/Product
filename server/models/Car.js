const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name:{type: String, required: true},
  userName:{type: String, required: true},
  password:{type: String, required: true},
  carNumber: { type: String, required: true },
  link: { type: String, required: true },
  qrCodeImage: { type: String, required: true },
});

module.exports = mongoose.model('Car', carSchema);
