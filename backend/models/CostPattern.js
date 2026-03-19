const mongoose = require('mongoose');

const costPatternSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  unitType: { type: String, default: 'hour' }, 
  oldMethodPrice: { type: Number, required: true },
  newMethodPrice: { type: Number, required: true },
  description: String
});

module.exports = mongoose.model('CostPattern', costPatternSchema);