const fs = require('fs');
const path = require('path');

function generateWorkout() {
  return {
    date: new Date().toLocaleDateString(),
    exercises: [
      { name: 'Push-ups', reps: `3 x ${Math.floor(Math.random() * 20) + 10}` },
      { name: 'Squats', reps: `3 x ${Math.floor(Math.random() * 30) + 20}` },
      { name: 'Pull-ups', reps: `3 x ${Math.floor(Math.random() * 15) + 5}` },
      { name: 'Burpees', reps: `3 x ${Math.floor(Math.random() * 20) + 10}` }
    ]
  };
}

const filePath = path.join('data', 'workout.json');

const workout = generateWorkout();
fs.writeFile(filePath, JSON.stringify(workout, null, 2), (err) => {
  if (err) {
    console.error('Error writing workout.json:', err);
  } else {
    console.log('Workout generated and saved successfully!');
  }
});
