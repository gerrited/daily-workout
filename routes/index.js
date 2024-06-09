const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Main route
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'workout.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading workout.json:', err);
      return res.status(500).send('Error reading workout data');
    }

    const workout = JSON.parse(data);
    res.render('index', { workout });
  });
});

module.exports = router;
