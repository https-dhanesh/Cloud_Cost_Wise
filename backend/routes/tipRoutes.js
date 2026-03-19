const express = require('express');
const router = express.Router();
const Tip = require('../models/Tip');

router.post('/', async (req, res) => {
  const { 
    title, serviceName, category, description, 
    calculationType, unitLabel, 
    oldFixedRate, newFixedRate, oldVarRate, newVarRate 
  } = req.body;

  try {
    const newTip = new Tip({
      title, serviceName, category, description,
      calculationType, unitLabel,
      oldFixedRate, newFixedRate, oldVarRate, newVarRate
    });

    const savedTip = await newTip.save();
    res.status(201).json(savedTip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tips = await Tip.find().sort({ createdAt: -1 });
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Tip.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;