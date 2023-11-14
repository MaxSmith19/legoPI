
const mongoose = require('mongoose');

const legoSetSchema = new mongoose.Schema({
  setCode: {
    type: String, // Sometimes contains hyphens and letters
    required: true
  },
  additionalData: { // Can be obtained using a python script.
    type: Object,
    required: false
  },
  userID: {
    type: String,
    required: true
  }
});

const Storage= mongoose.model('Storage', legoSetSchema);

module.exports = Storage;
