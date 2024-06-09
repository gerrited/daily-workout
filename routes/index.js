const express = require('express');
const router = express.Router();

// Sample workout data
const workout = {
  date: new Date().toLocaleDateString(),
  exercises: [
    { name: 'Push-ups', reps: '3 x 15' },
    { name: 'Squats', reps: '3 x 20' },
    { name: 'Pull-ups', reps: '3 x 10' },
    { name: 'Burpees', reps: '3 x 12' }
  ]
};

// Main route
router.get('/', (req, res) => {
  res.render('index', { workout });
});

module.exports = router;
