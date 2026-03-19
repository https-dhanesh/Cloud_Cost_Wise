const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  serviceName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  calculationType: { type: String, default: 'TIME' },
  unitLabel: { type: String, default: 'Hrs/Mo' },
  oldFixedRate: { type: Number, default: 0 },
  newFixedRate: { type: Number, default: 0 },
  oldVarRate: { type: Number, default: 0 },
  newVarRate: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Tip', tipSchema);